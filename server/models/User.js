const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User;