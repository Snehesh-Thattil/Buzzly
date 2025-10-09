import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import connectToMongoDB from './database/connection.js'
import { initSocket } from './socket/socket.js'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

dotenv.config()
const __dirname = path.resolve()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// Serve frontend
app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

// Start & attach sockets
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  connectToMongoDB()
  console.log(`✅ Server started on port ${PORT}`)
})

// initialize socket.io
initSocket(server)
