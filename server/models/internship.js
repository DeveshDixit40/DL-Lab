const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({    imageUrl: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    personTitle: {
        type: String,
        required: true
    },
    socialLinks: {
        linkedin: String,
        twitter: String,
        email: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Internship', internshipSchema);
