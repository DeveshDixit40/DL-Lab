const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['event', 'project', 'team', 'other'],
        default: 'other'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
