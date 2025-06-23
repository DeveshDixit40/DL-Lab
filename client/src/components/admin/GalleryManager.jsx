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
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const GalleryManager = () => {
  const [gallery, setGallery] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'other',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setGallery(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setFormData({
        ...item,
        date: new Date(item.date).toISOString().split('T')[0]
      });
      setEditingItem(item);
    } else {
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: 'other',
        date: new Date().toISOString().split('T')[0]
      });
      setEditingItem(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
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
    try {      const url = editingItem
        ? `${import.meta.env.VITE_API_URL}/api/gallery/${editingItem._id}`
        : `${import.meta.env.VITE_API_URL}/api/gallery`;
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });      if (response.ok) {
        handleClose();
        fetchGallery();
      } else {
        const errorData = await response.json();
        console.error('Error saving gallery item:', errorData);
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    const token = localStorage.getItem('adminToken');
    try {      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchGallery();
      } else {
        console.error('Error deleting gallery item');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Gallery</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Image
        </Button>
      </Box>

      <Grid container spacing={3}>
        {gallery.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.imageUrl}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" noWrap>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleOpen(item)} size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
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
              rows={3}
              value={formData.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="imageUrl"
              label="Image URL"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="project">Project</MenuItem>
                <MenuItem value="team">Team</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="date"
              label="Date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GalleryManager;
