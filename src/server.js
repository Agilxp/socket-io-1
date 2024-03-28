const { createServer } = require('http')
const next = require('next')
const {Server} = require('socket.io')

const port = parseInt(process.env.PORT || '', 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handler = app.getRequestHandler()

const httpServer = createServer(handler)
const io = new Server(httpServer)
app.prepare().then(() => {

    console.log('> IO server created.')

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('message1', (data) => {
            console.log('Received from client: ', data)
            io.emit('message2', data);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })

    httpServer
        .once('error', (err) => {
            console.log('Error in http server', err)
            process.exit(1)
        })
        .listen(port)

    console.log('> Server started')
})
