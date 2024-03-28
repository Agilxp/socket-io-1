'use client'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {socket} from '@/lib/socket'

export default function Home() {
    const [isConnected, setConnected] = useState<boolean>(false)
    const [transport, setTransport] = useState<string>('N/A')
    const [messages, setMessages] = useState<Array<string>>([])
    const [currentMessage, setCurrentMessage] = useState('')

    useEffect(() => {
        console.log('Checking if I get it more than once')
        const onConnect = () => {
            setConnected(true)
            setTransport(socket.io.engine.transport.name)
            socket.io.engine.on('upgrade', (transport) => {
                setTransport(transport.name)
            })
        }

        const onDisconnect = () => {
            setConnected(false)
            setTransport('N/A')
        }

        if (socket.connected) {
            onConnect()
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        socket.on('message2', (message: any) => {
            console.log('Received message2 from the server', message)
            setMessages((prevMessages) => [...prevMessages, message]);
        })

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [])

    const sendMessage = () => {
        console.log('Sending message1 to the server')
        // Send the message to the server
        socket.emit('message1', currentMessage)
        setCurrentMessage('')
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
            <p>Transport: {transport}</p>
            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button type={'button'} className={'rounded-2xl bg-amber-300 z-20'} onClick={sendMessage}>Send</button>
            {messages.map((message, index) => (<p key={index} className="text-blue-500">{message}</p>))}
        </main>
    )
}
