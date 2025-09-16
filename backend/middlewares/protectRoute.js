const jwt = require('jsonwebtoken')
const User = require('../database/models/users.model')

const protectRoute = async (req, res, next) => {
    try {
        // ACCESS TOKEN FROM COOKIE
        const token = req.cookies.jwt
        if (!token) return res.status(401).json({ error: "Unauthorized  - No Token" })

        // VERIFY JWT TOKEN WITH SECRETKEY
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.send(401).json({ error: "Unauthorized  - Invalid Token" })

        // FETCH USERID FROM DATABASE
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) return res.send(404).json({ error: "User not found" })

        req.user = user
        next()
    }
    catch (err) {
        console.log("Error in protectRoute middleware :", err.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = protectRoute