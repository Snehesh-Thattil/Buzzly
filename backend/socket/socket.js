import { Server } from 'socket.io'

export let io = null
const userSocketMap = {}

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
    const userId = socket.handshake.query.userId
    if (userId && userId !== 'undefined') userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} left`)
      delete userSocketMap[userId]
      io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
  })
}

export const getRecieverSocketId = (receiverId) => userSocketMap[receiverId]
// export const getIO = () => io
