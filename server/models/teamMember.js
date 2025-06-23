const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: String,
    email: String,
    socialLinks: {
        linkedin: String,
        github: String,
        twitter: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
