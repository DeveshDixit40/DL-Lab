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

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    technologies: '',
    link: '',
    teamMembers: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleOpen = (project = null) => {
    if (project) {
      setFormData({
        ...project,
        technologies: project.technologies ? project.technologies.join(', ') : '',
        teamMembers: project.teamMembers ? project.teamMembers.join(', ') : ''
      });
      setEditingProject(project);
    } else {
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        technologies: '',
        link: '',
        teamMembers: ''
      });
      setEditingProject(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
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
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
        teamMembers: formData.teamMembers.split(',').map(member => member.trim()).filter(Boolean)
      };      const url = editingProject
        ? `${import.meta.env.VITE_API_URL}/api/projects/${editingProject._id}`
        : `${import.meta.env.VITE_API_URL}/api/projects`;
      
      const response = await fetch(url, {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(processedData)
      });

      if (response.ok) {
        handleClose();
        fetchProjects();
      } else {
        console.error('Error saving project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProjects();
      } else {
        console.error('Error deleting project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Manage Projects</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Project
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Technologies</TableCell>
              <TableCell>Team Members</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description.substring(0, 100)}...</TableCell>
                <TableCell>
                  {project.technologies && project.technologies.map((tech, index) => (
                    <Chip key={index} label={tech} size="small" sx={{ m: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>
                  {project.teamMembers && project.teamMembers.join(', ')}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(project)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(project._id)} color="error">
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
          {editingProject ? 'Edit Project' : 'Add New Project'}
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
              name="imageUrl"
              label="Image URL"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              name="technologies"
              label="Technologies (comma-separated)"
              fullWidth
              value={formData.technologies}
              onChange={handleChange}
              margin="normal"
              helperText="Enter technologies separated by commas"
            />
            <TextField
              name="link"
              label="Project Link"
              fullWidth
              value={formData.link}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="teamMembers"
              label="Team Members (comma-separated)"
              fullWidth
              value={formData.teamMembers}
              onChange={handleChange}
              margin="normal"
              helperText="Enter team members separated by commas"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectManager;
