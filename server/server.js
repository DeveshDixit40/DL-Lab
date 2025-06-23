require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { loginAdmin, registerAdmin, updateAdminCredentials } = require('./controllers/authController');
const { protect } = require('./middleware/authMiddleware');
const publicationController = require('./controllers/publicationController');
const projectController = require('./controllers/projectController');
const internshipController = require('./controllers/internshipController');
const courseController = require('./controllers/courseController');
const galleryController = require('./controllers/galleryController');
const teamController = require('./controllers/teamController');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.post('/api/admin/register', registerAdmin);
app.post('/api/admin/login', loginAdmin);
app.get('/api/admin/profile', protect, (req, res) => {
    res.json(req.admin);
});
app.put('/api/admin/update-credentials', protect, updateAdminCredentials);

// Publications routes
app.get('/api/publications', publicationController.getPublications);
app.post('/api/publications', protect, publicationController.createPublication);
app.put('/api/publications/:id', protect, publicationController.updatePublication);
app.delete('/api/publications/:id', protect, publicationController.deletePublication);

// Projects routes
app.get('/api/projects', projectController.getProjects);
app.post('/api/projects', protect, projectController.createProject);
app.put('/api/projects/:id', protect, projectController.updateProject);
app.delete('/api/projects/:id', protect, projectController.deleteProject);

// Internships routes
app.get('/api/internships', internshipController.getInternships);
app.post('/api/internships', protect, internshipController.createInternship);
app.put('/api/internships/:id', protect, internshipController.updateInternship);
app.delete('/api/internships/:id', protect, internshipController.deleteInternship);

// Courses routes
app.get('/api/courses', courseController.getCourses);
app.post('/api/courses', protect, courseController.createCourse);
app.put('/api/courses/:id', protect, courseController.updateCourse);
app.delete('/api/courses/:id', protect, courseController.deleteCourse);

// Gallery routes
app.get('/api/gallery', galleryController.getGalleryItems);
app.post('/api/gallery', protect, galleryController.createGalleryItem);
app.put('/api/gallery/:id', protect, galleryController.updateGalleryItem);
app.delete('/api/gallery/:id', protect, galleryController.deleteGalleryItem);

// Team routes
app.get('/api/team', teamController.getTeamMembers);
app.post('/api/team', protect, teamController.createTeamMember);
app.put('/api/team/:id', protect, teamController.updateTeamMember);
app.delete('/api/team/:id', protect, teamController.deleteTeamMember);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    });