const TeamMember = require('../models/teamMember');

// Get all team members
exports.getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find().sort({ createdAt: -1 });
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new team member
exports.createTeamMember = async (req, res) => {
    const teamMember = new TeamMember(req.body);
    try {
        const newTeamMember = await teamMember.save();
        res.status(201).json(newTeamMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a team member
exports.updateTeamMember = async (req, res) => {
    try {
        const teamMember = await TeamMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.json(teamMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a team member
exports.deleteTeamMember = async (req, res) => {
    try {
        const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
        if (!teamMember) {
            return res.status(404).json({ message: 'Team member not found' });
        }
        res.json({ message: 'Team member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
