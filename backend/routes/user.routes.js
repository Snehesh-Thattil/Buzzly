const express = require('express')
const protectRoute = require('../middlewares/protectRoute')
const userControllers = require('../controllers/user.controllers')

const router = express.Router()

router.get('/fetch-conversations', protectRoute, userControllers.fetchConversations)
router.get('/search-users/:searchQuery', protectRoute, userControllers.searchUsers)

module.exports = router