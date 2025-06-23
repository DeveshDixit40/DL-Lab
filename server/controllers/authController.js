const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// Login admin
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', { username });
        
        // Check for user in database
        const admin = await Admin.findOne({ username });
        if (admin && (await admin.matchPassword(password))) {
            res.json({
                token: generateToken(admin._id),
                admin: {
                    _id: admin._id,
                    username: admin.username,
                }
            });
            return;
        }

        res.status(401).json({ message: 'Invalid username or password' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Register a new admin
const registerAdmin = async (req, res) => {
    try {
        const { username, password, registrationCode } = req.body;
        
        // Check for registration code (simple security measure)
        if (registrationCode !== process.env.REGISTRATION_CODE && registrationCode !== 'DLL_SECURE_CODE') {
            return res.status(400).json({ message: 'Invalid registration code' });
        }
        
        // Check if admin already exists
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin with this username already exists' });
        }
        
        // Create new admin
        const admin = await Admin.create({
            username,
            password
        });
        
        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                token: generateToken(admin._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update admin credentials
const updateAdminCredentials = async (req, res) => {
    try {
        const { id } = req.admin;
        const { username, currentPassword, newPassword } = req.body;
        
        // If the ID is 'admin', return an error as we can't update the hardcoded admin
        if (id === 'admin') {
            return res.status(400).json({ message: 'Cannot update hardcoded admin. Please create a new admin account.' });
        }

        // Find admin by ID
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        // Validate current password if trying to change password
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Current password is required' });
            }
            
            const isPasswordValid = await admin.matchPassword(currentPassword);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }
            
            // Update password
            admin.password = newPassword;
        }
        
        // Update username if provided and different
        if (username && username !== admin.username) {
            // Check if username is already taken
            const usernameExists = await Admin.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            
            admin.username = username;
        }
        
        // Save changes
        const updatedAdmin = await admin.save();
        
        res.status(200).json({
            _id: updatedAdmin._id,
            username: updatedAdmin.username,
            message: 'Admin credentials updated successfully'
        });
    } catch (error) {
        console.error('Update admin credentials error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { loginAdmin, registerAdmin, updateAdminCredentials };