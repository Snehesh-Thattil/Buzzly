const express = require('express')
const protectRoute = require('../middlewares/protectRoute')
const userControllers = require('../controllers/user.controllers')

const router = express.Router()

router.get('/fetch-conversations', protectRoute, userControllers.fetchConversations)

module.exports = router