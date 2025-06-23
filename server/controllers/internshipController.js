const Internship = require('../models/internship');

// Get all internships
exports.getInternships = async (req, res) => {
    try {
        const internships = await Internship.find().sort({ year: -1 });
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new internship
exports.createInternship = async (req, res) => {
    const internship = new Internship(req.body);
    try {
        const newInternship = await internship.save();
        res.status(201).json(newInternship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an internship
exports.updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        res.json(internship);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an internship
exports.deleteInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }
        res.json({ message: 'Internship deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
