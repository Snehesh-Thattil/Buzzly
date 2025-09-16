const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth.routes')
const messageRoutes = require('./routes/message.routes')
const userRoutes = require('./routes/user.routes')
const connectToMongoDB = require('./database/connection')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json()) // PARSE REQ.BODY AS JSON PAYLOADS
app.use(cookieParser()) // PARSE COOKIES TO ACCESS VIA REQ.COOKIES

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, () => { connectToMongoDB() && console.log(`Server started running on ${PORT}`) })