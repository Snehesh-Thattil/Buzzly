import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)

// CREATE SOCKET SERVER
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

const userSocketMap = {} // USERS SOCKET IDS: { userId: socketId }

// FUNCTION TO GET RECEIVER SOCKET ID
const getRecieverSocketId = (receiverId) => userSocketMap[receiverId]

// ESTABLISH SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)

    const userId = socket.handshake.query.userId
    if (userId !== 'undefined') userSocketMap[userId] = socket.id

    // EMIT ONLINE USERS TO ALL CLIENTS
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    // HANDLE DISCONNECTION
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} left`)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

export { app, server, io, getRecieverSocketId }
