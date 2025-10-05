const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        enum: ['Non-Anemic', 'Mild', 'Severe'],
        default: 'Non-Anemic'
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)