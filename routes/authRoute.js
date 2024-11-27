import express from 'express'
import { registerUser } from '../controllers/authController.js'

const router = express.Router()

router.route("/register")
    .post(registerUser)

router.route("/login")
    .post()


export default router