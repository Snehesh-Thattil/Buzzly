import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import * as userControllers from '../controllers/user.controllers.js'

const router = express.Router()

router.get('/fetch-conversations', protectRoute, userControllers.fetchConversations)
router.get('/search-users/:searchQuery', protectRoute, userControllers.searchUsers)

export default router