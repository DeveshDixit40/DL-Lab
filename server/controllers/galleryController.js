const Gallery = require('../models/gallery');

// Get all gallery items
exports.getGalleryItems = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({ date: -1 });
        res.json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new gallery item
exports.createGalleryItem = async (req, res) => {
    const galleryItem = new Gallery(req.body);
    try {
        const newGalleryItem = await galleryItem.save();
        res.status(201).json(newGalleryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a gallery item
exports.updateGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        res.json(galleryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
        if (!galleryItem) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        res.json({ message: 'Gallery item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
