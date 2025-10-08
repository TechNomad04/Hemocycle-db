const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'female'
    },
    age: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)