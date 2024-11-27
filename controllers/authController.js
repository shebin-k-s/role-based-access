import User, { validRoles } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

export const invalidatedTokens = new Set();

export const validateRole = (role) => validRoles.includes(role)

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

export const loginUser = async (req, res) => {

    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: "Username doesn't exist" })
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Password incorrect" })
        }

        const token = Jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.status(200).json({ message: "Login successfull", token })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    invalidatedTokens.add(token);
    return res.status(200).json({ message: 'Logout successful' });

};