const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    duration: String,
    syllabus: [String],
    imageUrl: String,
    enrollmentLink: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
