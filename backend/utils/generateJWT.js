const jwt = require('jsonwebtoken')


const generateTokenAndCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // IN MS
        httpOnly: true, // PREVENT CROSS-SITE SCRIPTING(XSS) ATTACKS
        sameSite: "strict", // PREVENT CROSS-SITE REQUEST FORGERY(CSRF) ATTACKS
        secure: process.env.NODE_ENV !== 'development'
    })
}

module.exports = generateTokenAndCookie