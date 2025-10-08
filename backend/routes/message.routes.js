import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import * as messageControllers from '../controllers/message.controllers.js'

const router = express.Router()

router.get('/fetch-chats/:id', protectRoute, messageControllers.fetchChats)
router.post('/send-message/:id', protectRoute, messageControllers.sendMesage)

export default router