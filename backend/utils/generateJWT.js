import jwt from 'jsonwebtoken'

const generateTokenAndCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'strict', // Prevent CSRF attacks
        // secure: process.env.NODE_ENV === 'production', // Uncomment in production
    })
}

export default generateTokenAndCookie