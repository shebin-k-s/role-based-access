export const adminData = async (req, res) => {
    return res.status(200).json({ message: "'Welcome to Admin protected routes", data: req.user })
}