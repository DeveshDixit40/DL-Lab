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
  Typography,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: '',
    personName: '',
    personTitle: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      email: ''
    }
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/internships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setInternships(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };
  const handleOpen = (internship = null) => {
    if (internship) {
      setFormData(internship);
      setEditingInternship(internship);
    } else {
      setFormData({
        imageUrl: '',
        personName: '',
        personTitle: '',
        socialLinks: {
          linkedin: '',
          twitter: '',
          email: ''
        }
      });
      setEditingInternship(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingInternship(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialNetwork = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialNetwork]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      const processedData = {
        ...formData
      };
      const url = editingInternship
        ? `${import.meta.env.VITE_API_URL}/api/internships/${editingInternship._id}`
        : `${import.meta.env.VITE_API_URL}/api/internships`;
      
      const response = await fetch(url, {
        method: editingInternship ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(processedData)
      });

      if (response.ok) {
        handleClose();
        fetchInternships();
      } else {
        console.error('Error saving internship');
      }
    } catch (error) {
      console.error('Error saving internship:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this internship?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/internships/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchInternships();
      } else {
        console.error('Error deleting internship');
      }
    } catch (error) {
      console.error('Error deleting internship:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Internships</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Internship
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Social Links</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships.map((internship) => (
              <TableRow key={internship._id}>
                <TableCell>
                  {internship.imageUrl && (
                    <img 
                      src={internship.imageUrl} 
                      alt={internship.personName} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '25px' }}
                    />
                  )}
                </TableCell>
                <TableCell>{internship.personName}</TableCell>
                <TableCell>{internship.personTitle}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {internship.socialLinks.email && (
                      <Chip size="small" label="Email" />
                    )}
                    {internship.socialLinks.linkedin && (
                      <Chip size="small" label="LinkedIn" />
                    )}
                    {internship.socialLinks.twitter && (
                      <Chip size="small" label="Twitter" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(internship)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(internship._id)} color="error">
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
          {editingInternship ? 'Edit Internship' : 'Add New Internship'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              name="imageUrl"
              label="Person's Photo URL"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
              required
              helperText="URL to the person's profile photo"
            />
            <TextField
              name="personName"
              label="Person's Name"
              fullWidth
              value={formData.personName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="personTitle"
              label="Person's Title"
              fullWidth
              value={formData.personTitle}
              onChange={handleChange}
              margin="normal"
              required
              helperText="e.g. Research Intern, Data Scientist, etc."
            />
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Social Links</Typography>
            <TextField
              name="social_email"
              label="Email Address"
              fullWidth
              value={formData.socialLinks.email}
              onChange={handleChange}
              margin="normal"
              required
              type="email"
            />
            <TextField
              name="social_linkedin"
              label="LinkedIn Profile URL"
              fullWidth
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="social_twitter"
              label="Twitter Profile URL"
              fullWidth
              value={formData.socialLinks.twitter}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingInternship ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InternshipManager;
