const { mongoose } = require('mongoose')
const Conversations = require('../database/models/conversations.model')
const Messages = require('../database/models/messages.model')
const { getRecieverSocketId, io } = require('../socket/socket')

module.exports = {
    sendMesage: async (req, res) => {
        try {
            const { message } = req.body
            const { id: recieverId } = req.params
            const senderId = req.user._id

            // FIND THE CONVERSATION COLLECTION OF SENDER AND RECIEVER IN DB
            let conversation = await Conversations.findOne({
                participants: { $all: [senderId, recieverId] }
            })

            // CREATE NEW IF THERE'S NO CONVERSATION.            
            if (!conversation) {
                conversation = await Conversations.create({
                    participants: [senderId, recieverId]
                })
            }

            // CREATE NEW MESSAGE
            const newMessage = new Messages({
                senderId,
                recieverId,
                message
            })

            // PUSH NEW MESSAGE IN THEIR CONVERSATION
            if (newMessage) {
                conversation.messages.push(newMessage)
            }

            // PARALLELLY SAVE IN BOTH COLLECTIONS
            await Promise.all([conversation.save(), newMessage.save()])

            // SOCKET IO FUNTIONALITY
            const recieverSocketId = getRecieverSocketId(recieverId)

            if (recieverSocketId) {
                // IO.TO USED SEND EVENTS TO A SPECIFIC USER
                io.to(recieverSocketId).emit("newMessage", newMessage)
            }

            res.status(201).json(newMessage)
        }
        catch (err) {
            console.log("Error in sendMessage controller :", err.message)
            res.status(500).json({ error: "Internal server error" })
        }
    },
    fetchChats: async (req, res) => {
        try {
            const { id: chatterId } = req.params
            const userId = req.user._id

            // GET CONVERSATION WITH THE PERSON
            let conversation = await Conversations.findOne({
                participants: { $all: [userId, chatterId] }
            }).populate("messages") // POPULATE MESSAGES INSTEAD OF REFERENCES

            if (!conversation) return res.status(200).json([])

            const messages = conversation.messages
            res.status(200).json(messages)
        }
        catch (err) {
            console.log("Error in getMessage controller :", err.message)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}