export const userData = async (req, res) => {
    return res.status(200).json({ message: "'Welcome to user protected routes", data: req.user })
}