export const moderatorData = async (req, res) => {
    return res.status(200).json({ message: "'Welcome to moderator protected routes", data: req.user })
}