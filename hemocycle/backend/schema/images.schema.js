const mongoose = require('mongoose');

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

module.exports = mongoose.model('Image', imageSchema);
