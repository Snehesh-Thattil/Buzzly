import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// IMPORT ROUTE HANDLERS
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

// IMPORT DB CONNECTION AND SOCKET
import connectToMongoDB from './database/connection.js'
import { app, server } from './socket/socket.js'

// LOAD ENV VARIABLES
dotenv.config()

// ROOT DIRECTORY PATH
const __dirname = path.resolve()

// MIDDLEWARE
app.use(express.json()) // PARSE INCOMING JSON REQUESTS
app.use(cookieParser()) // PARSE COOKIES FROM INCOMING REQUESTS

// ENABLE CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // FRONTEND ORIGIN
        credentials: true, // ALLOW COOKIES AND AUTH HEADERS
    })
)

// API ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// STATIC FILES (FOR DEPLOYMENT)
app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

// START SERVER
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`✅ Server started running on port ${PORT}`)
})