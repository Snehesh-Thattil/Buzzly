const Users = require('../database/models/users.model')

module.exports = {
    fetchConversations: async (req, res) => {
        try {
            const loggedInUser = req.user._id

            const filteredUsers = await Users.find({ _id: { $ne: loggedInUser } }).select("-password")
            res.status(200).json([...filteredUsers])
        }
        catch (err) {
            console.log("Error in fetchConversations controller", err.message)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}