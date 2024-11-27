import Jwt from 'jsonwebtoken'
import { invalidatedTokens } from '../controllers/authController.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" })
    }

    if (invalidatedTokens.has(token)) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    try {

        const decodedToken = Jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedToken
        next()
    } catch (error) {
        return res.status(500).json({ message: "Invalid or expired token" })
    }
}