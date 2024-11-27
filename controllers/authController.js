import User, { validateRole } from "../models/userModel.js";
import bcrypt from 'bcrypt'


export const registerUser = async (req, res) => {

    const { username, password, role } = req.body;

    try {
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (!validateRole(role)) {
            return res.status(400).json({ message: "Invalid Role" })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exist' })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser = new User({
            username,
            password: hashedPassword,
            role,
        })

        await newUser.save()

        return res.status(201).json({ message: 'Account created successfully', newUser })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: 'Internal server error' })
    }

}