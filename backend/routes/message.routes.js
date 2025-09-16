const express = require('express')
const messageControllers = require('../controllers/message.controllers')
const protectRoute = require('../middlewares/protectRoute')

const router = express.Router()

router.get('/fetch-chats/:id', protectRoute, messageControllers.fetchChats)
router.post('/send-message/:id', protectRoute, messageControllers.sendMesage)

module.exports = router