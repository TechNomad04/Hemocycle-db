const mongoose = require('mongoose');
const {xssCleanPlugin} = require('../utils/mongoosexssclean.utils')

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    part: {
        type: String,
        enum: ["Fingernails", "Conjunctiva", "Tongue"]
    }
}, { timestamps: true });

imageSchema.plugin(xssCleanPlugin)

module.exports = mongoose.model('Image', imageSchema);
