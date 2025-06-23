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
  Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const TeamManager = () => {
  const [team, setTeam] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    imageUrl: '',
    description: '',
    email: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem('adminToken');      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/team`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const handleOpen = (member = null) => {
    if (member) {
      setFormData({
        ...member,
        socialLinks: {
          linkedin: member.socialLinks?.linkedin || '',
          github: member.socialLinks?.github || '',
          twitter: member.socialLinks?.twitter || ''
        }
      });
      setEditingMember(member);
    } else {
      setFormData({
        name: '',
        role: '',
        imageUrl: '',
        description: '',
        email: '',
        socialLinks: {
          linkedin: '',
          github: '',
          twitter: ''
        }
      });
      setEditingMember(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMember(null);
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
    const token = localStorage.getItem('adminToken');    try {
      if (!token) {
        throw new Error('No auth token found');
      }

      const url = editingMember
        ? `${import.meta.env.VITE_API_URL}/api/team/${editingMember._id}`
        : `${import.meta.env.VITE_API_URL}/api/team`;
      
      const response = await fetch(url, {
        method: editingMember ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });      if (response.ok) {
        handleClose();
        fetchTeam();
      } else {
        const errorData = await response.json();
        console.error('Error saving team member:', errorData);
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    const token = localStorage.getItem('adminToken');
    try {      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchTeam();
      } else {
        console.error('Error deleting team member');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Team</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Team Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {team.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member._id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={member.imageUrl}
                alt={member.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {member.role}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <IconButton onClick={() => handleOpen(member)} size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(member._id)} size="small" color="error">
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
          {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="role"
              label="Role"
              fullWidth
              value={formData.role}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="imageUrl"
              label="Profile Image URL"
              fullWidth
              value={formData.imageUrl}
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
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="social_linkedin"
              label="LinkedIn URL"
              fullWidth
              value={formData.socialLinks.linkedin}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="social_github"
              label="GitHub URL"
              fullWidth
              value={formData.socialLinks.github}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="social_twitter"
              label="Twitter URL"
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
            {editingMember ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamManager;
