const Publication = require('../models/publication');

// Get all publications
exports.getPublications = async (req, res) => {
    try {
        const publications = await Publication.find().sort({ year: -1 });
        res.json(publications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new publication
exports.createPublication = async (req, res) => {
    const publication = new Publication(req.body);
    try {
        const newPublication = await publication.save();
        res.status(201).json(newPublication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a publication
exports.updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        res.json(publication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a publication
exports.deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findByIdAndDelete(req.params.id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        res.json({ message: 'Publication deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
