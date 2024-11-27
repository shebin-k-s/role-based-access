import express from 'express'
import { adminData } from '../../controllers/adminController.js'


const router = express.Router()

router.route("/")
    .get(adminData)

export default router