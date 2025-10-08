import Conversations from '../database/models/conversations.model.js'
import Users from '../database/models/users.model.js'

export const fetchConversations = async (req, res) => {
    try {
        const loggedInUser = req.user._id

        const filteredConversations = await Conversations.aggregate([
            { $match: { participants: { $in: [loggedInUser] } } },
            { $unwind: "$participants" },
            { $match: { participants: { $ne: loggedInUser } } },
            {
                $lookup: {
                    from: "users",
                    localField: "participants",
                    foreignField: "_id",
                    as: 'userDetails'
                }
            },
            { $unwind: "$userDetails" },
            {
                $group: {
                    _id: "$userDetails._id",
                    user: { $first: "$userDetails" }
                }
            },
            { $replaceRoot: { newRoot: "$user" } },
            { $project: { password: 0 } }
        ]).exec()

        res.status(200).json([...filteredConversations])
    } catch (err) {
        console.log("Error in fetchConversations controller :", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const searchUsers = async (req, res) => {
    const searchQuery = req.params.searchQuery.toLowerCase()

    if (!searchQuery?.trim()) {
        return res.status(400).json({ error: "Search query is required" })
    }

    try {
        const searchedUsers = await Users.find({
            _id: { $ne: req.user._id },
            $or: [
                { username: { $regex: searchQuery, $options: "i" } },
                { fullName: { $regex: searchQuery, $options: "i" } }
            ]
        }).select("-password")

        res.status(200).json(searchedUsers)
    } catch (err) {
        console.log("Error in searchUsers controller", err.message)
        res.status(500).json({ error: "Internal server error", msg: err.message })
    }
}
