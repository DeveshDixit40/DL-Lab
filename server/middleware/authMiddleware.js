const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const protect = async (req, res, next) => {
    let token;
    console.log('Request path:', req.path);
    console.log('Request method:', req.method);

    // console.log('Auth Headers:', req.headers.authorization);
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {            token = req.headers.authorization.split(' ')[1];
            console.log('Token:', token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            console.log('Decoded token:', decoded);
            
            // Check if this is a legacy admin token
            if (decoded.id === 'admin') {
                req.admin = { _id: 'admin', username: 'admin' };
            } else {
                // Find admin by ID
                const admin = await Admin.findById(decoded.id).select('-password');
                if (!admin) {
                    return res.status(401).json({ message: 'Not authorized, admin not found' });
                }
                req.admin = admin;
            }
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };