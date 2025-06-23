const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    conference: String,
    abstract: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Publication', publicationSchema);
