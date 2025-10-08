import express from 'express'
import * as authControllers from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/signup', authControllers.signup)
router.post('/login', authControllers.login)
router.get('/logout', authControllers.logout)

export default router
