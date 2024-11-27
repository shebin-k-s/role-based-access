import Jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "Authorization token is missing" })
    }

    try {

        const decodedToken = Jwt.verify(token, process.env.JWT_KEY)

        req.user = decodedToken
        console.log(decodedToken);

        next()
    } catch (error) {
        return res.status(500).json({ message: "Invalid or expired token" })
    }
}