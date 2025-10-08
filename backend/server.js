const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')

// IMPORT ROUTE HANDLERS
const authRoutes = require('./routes/auth.routes')
const messageRoutes = require('./routes/message.routes')
const userRoutes = require('./routes/user.routes')

const connectToMongoDB = require('./database/connection') // IMPORT DB CONNECTION
const { app, server } = require('./socket/socket') // IMPORT SOCKET SETUP

app.use(express.json()) // PARSE INCOMING JSON REQUESTS
app.use(cookieParser()) // PARSE COOKIES FROM INCOMING REQUESTS

// ENABLE CORS
app.use(cors({
    origin: 'http://localhost:3000', // FRONTEND ORIGIN
    credentials: true // ALLOW COOKIES AND AUTH HEADERS
}))

// API ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

// START SERVER
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`✅ Server started running on ${PORT}`)
})