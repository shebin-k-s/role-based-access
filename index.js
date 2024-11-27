import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { adminRoute, authRoute, moderatorRoute, userRoute } from './routes/index.js'
import { verifyToken } from './middleware/authMiddleware.js'
import { authorizeRole } from './middleware/authorizeRole.js'


dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", authRoute)

app.use("/api/v1/admin", verifyToken, authorizeRole(['admin']), adminRoute)
app.use("/api/v1/moderator", verifyToken, authorizeRole(['moderator']), moderatorRoute)
app.use("/api/v1/user", verifyToken, authorizeRole(['user']), userRoute)


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`);

        })
    })
    .catch((error) => {
        console.log(error);

    })
