const Users = require('../database/models/users.model')
const bcrypt = require('bcrypt')
const generateTokenAndCookie = require('../utils/generateJWT')

module.exports = {
    signup: async (req, res) => {
        try {
            const { fullName, username, password, confirmPassword, gender } = req.body

            if (password !== confirmPassword) return res.status(400).json({ error: "Passwords don't match" })

            // VERIFY USER DOES NOT EXIST
            const user = await Users.findOne({ username })
            if (user) return res.status(400).json({ error: "Username already exists" })

            // BCRYPT PASSWORD HASH
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // CREATE NEW USER WITH THE MONGOOSE MODEL
            const newUser = new Users({
                fullName,
                username,
                gender,
                password: hashedPassword,
                profilePic: `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`
            })

            if (!newUser) return res.status(400).json({ error: "Invalid user data" })

            // GENERATE JWT AND COOKIE
            generateTokenAndCookie(newUser._id, res)

            // SAVE IN DATABASE
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }
        catch (err) {
            console.log("Error in signup controller :", err.message)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body

            // VERIFY USER
            const user = await Users.findOne({ username: username })
            if (!user) return res.status(400).json({ error: "Username doesn't exist" })

            // BCRYPT PASSWORD MATCH
            const passwordMatch = await bcrypt.compare(password, user?.password || "")
            if (!passwordMatch) return res.status(400).json({ error: "Invalid password! Try again." })

            // UPDATE ON TOKEN AND COOKIE
            generateTokenAndCookie(user._id, res)

            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                gender: user.gender,
                profilePic: user.profilePic
            })
        }
        catch (err) {
            console.log("Error in login controller :", err.message)
            res.status(500).json({ error: 'Internal Server Error', message: err.message })
        }
    },
    logout: (req, res) => {
        try {
            // DELETE THE JWT COOKIE
            res.cookie("jwt", "", { maxAge: 0 })
            res.status(200).json({ message: "Logged out successfully" })
        }
        catch (err) {
            console.log("Error in logout controller :", err.message)
            res.status(500).json({ error: 'Internal Server Error', message: err.message })
        }
    }
}