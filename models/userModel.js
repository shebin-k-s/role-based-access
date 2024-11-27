import mongoose, { mongo } from "mongoose"


const validRole = ['admin', 'user', 'moderator']
export const validateRole = (role) => validRole.includes(role)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        default: 'user',
    }
})

const User = mongoose.model('User', userSchema)

export default User;