import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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
