const express = require('express')
const { Server } = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)

// CREATE SOCKET SERVER
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
})

const userSocketMap = {} // OBJECT OF USERS SOCKET IDS IN THE CONNECTION AS { userId : socketId }

// SEND BACK RECIEVER SOCKET.ID ON FUNCTION CALL
const getRecieverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

// ESTABLISH SOCKET CONNECTION
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connceted`)

    const userId = socket.handshake.query.userId // WHICH IS SET FROM THE CLIENT
    if (userId !== "undefined") userSocketMap[userId] = socket.id

    // IO.EMIT USED TO SEND EVENTS TO ALL THE CONNECTED CLIENTS 
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // SOCKET.ON IS USED TO LISTEN TO THE EVENTS ON BOTH CLIENT AND SERVER
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} left`)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

module.exports = { app, server, io, getRecieverSocketId }