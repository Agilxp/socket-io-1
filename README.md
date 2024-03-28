This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What is this
Just a simple repo to check out how Socket.io and Next.js are working together. I wanted to check if I could run the 
Socket.io server as part of the Next.js application and it works fine.

### Why I wanted to do that?
As some might know, you can't run Socket.io on Vercel, so it might not be a good idea to merge them. However, I want to 
be able to use them together if possible. I also added a Dockerfile which contains the list of modules you need to copy 
to make Socket.io work (at least with the current version - 4.7.5).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will get a very ugly but working "chat" where any browser connected will receive all written messages.

You might get some doubles as local run often runs useEffect twice.

## Deploy on Vercel

Will not work!