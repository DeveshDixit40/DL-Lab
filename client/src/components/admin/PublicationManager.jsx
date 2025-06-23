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

const PublicationManager = () => {
  const [publications, setPublications] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    conference: '',
    link: '',
    abstract: ''
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const token = localStorage.getItem('adminToken');      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/publications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPublications(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  const handleOpen = (publication = null) => {
    if (publication) {
      setFormData(publication);
      setEditingPublication(publication);
    } else {
      setFormData({
        title: '',
        authors: '',
        year: new Date().getFullYear(),
        conference: '',
        link: '',
        abstract: ''
      });
      setEditingPublication(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPublication(null);
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
    try {      const url = editingPublication
        ? `${import.meta.env.VITE_API_URL}/api/publications/${editingPublication._id}`
        : `${import.meta.env.VITE_API_URL}/api/publications`;
        if (!token) {
        throw new Error('No auth token found');
      }
      
      const response = await fetch(url, {
        method: editingPublication ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });      if (response.ok) {
        handleClose();
        fetchPublications();
      } else {
        const errorData = await response.json();
        console.error('Error saving publication:', errorData);
      }
    } catch (error) {
      console.error('Error saving publication:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/publications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchPublications();
      } else {
        console.error('Error deleting publication');
      }
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Publications</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Publication
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Conference</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publications.map((publication) => (
              <TableRow key={publication._id}>
                <TableCell>{publication.title}</TableCell>
                <TableCell>{publication.authors}</TableCell>
                <TableCell>{publication.year}</TableCell>
                <TableCell>{publication.conference}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(publication)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(publication._id)} color="error">
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
          {editingPublication ? 'Edit Publication' : 'Add New Publication'}
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
              name="authors"
              label="Authors"
              fullWidth
              value={formData.authors}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="year"
              label="Year"
              type="number"
              fullWidth
              value={formData.year}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="conference"
              label="Conference/Journal"
              fullWidth
              value={formData.conference}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="link"
              label="Publication Link"
              fullWidth
              value={formData.link}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="abstract"
              label="Abstract"
              fullWidth
              multiline
              rows={4}
              value={formData.abstract}
              onChange={handleChange}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingPublication ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PublicationManager;
