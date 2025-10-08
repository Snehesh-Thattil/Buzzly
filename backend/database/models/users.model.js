import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 18
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 18
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true })

const Users = mongoose.model("Users", userSchema)
export default Users
