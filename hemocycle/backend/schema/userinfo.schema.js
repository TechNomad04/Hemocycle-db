const mongoose = require('mongoose')
const {xssCleanPlugin} = require('../utils/mongoosexssclean.utils')

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
    },
    patientid: {
        type: String,
        required: true
    },
    cncid: {
        type: String,
        required: true
    },
    others: {
        type: String
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, {timestamps: true})

userSchema.plugin(xssCleanPlugin)

module.exports = mongoose.model('User', userSchema)