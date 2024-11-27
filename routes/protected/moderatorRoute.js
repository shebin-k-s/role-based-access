import express from 'express'
import { moderatorData } from '../../controllers/moderatorController.js'


const router = express.Router()

router.route("/")
    .get(moderatorData)

export default router