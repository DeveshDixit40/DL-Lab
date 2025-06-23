import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    syllabus: '',
    imageUrl: '',
    enrollmentLink: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleOpen = (course = null) => {
    if (course) {
      setFormData({
        ...course,
        syllabus: course.syllabus ? course.syllabus.join('\n') : ''
      });
      setEditingCourse(course);
    } else {
      setFormData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        syllabus: '',
        imageUrl: '',
        enrollmentLink: ''
      });
      setEditingCourse(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCourse(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const processedData = {
        ...formData,
        syllabus: formData.syllabus.split('\n').map(item => item.trim()).filter(Boolean)
      };      const url = editingCourse
        ? `${import.meta.env.VITE_API_URL}/api/courses/${editingCourse._id}`
        : `${import.meta.env.VITE_API_URL}/api/courses`;
      
      const response = await fetch(url, {
        method: editingCourse ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(processedData)
      });

      if (response.ok) {
        handleClose();
        fetchCourses();
      } else {
        console.error('Error saving course');
      }
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchCourses();
      } else {
        console.error('Error deleting course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Courses</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(course)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(course._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCourse ? 'Edit Course' : 'Add New Course'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="instructor"
              label="Instructor"
              fullWidth
              value={formData.instructor}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="duration"
              label="Duration"
              fullWidth
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="syllabus"
              label="Syllabus"
              fullWidth
              multiline
              rows={6}
              value={formData.syllabus}
              onChange={handleChange}
              margin="normal"
              helperText="Enter each syllabus item on a new line"
            />
            <TextField
              name="imageUrl"
              label="Image URL"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="enrollmentLink"
              label="Enrollment Link"
              fullWidth
              value={formData.enrollmentLink}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingCourse ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManager;
