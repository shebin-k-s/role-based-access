import express from 'express'
import { userData } from '../../controllers/userController.js'


const router = express.Router()

router.route("/")
    .get(userData)

export default router