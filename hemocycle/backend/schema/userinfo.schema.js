const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Female'
    },
    category: {
        type: String,
        enum: ['Non-Anemic', 'Mild', 'Severe'],
        default: 'Non-Anemic'
    },
    age: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)