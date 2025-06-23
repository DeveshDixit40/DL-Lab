import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff, Save } from '@mui/icons-material';

const ProfileManager = () => {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate if changing password
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to set a new password');
        setLoading(false);
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        setLoading(false);
        return;
      }
    }

    try {
      // Only include fields that have values
      const updateData = {};
      if (formData.username) updateData.username = formData.username;
      if (formData.currentPassword) updateData.currentPassword = formData.currentPassword;
      if (formData.newPassword) updateData.newPassword = formData.newPassword;

      // Don't proceed if there's nothing to update
      if (Object.keys(updateData).length === 0) {
        setError('No changes to save');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/update-credentials`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update credentials');
      }

      setSuccess('Credentials updated successfully');
      
      // Update stored admin info if username was changed
      if (data.username && data.username !== adminInfo.username) {
        const updatedInfo = { ...adminInfo, username: data.username };
        localStorage.setItem('adminInfo', JSON.stringify(updatedInfo));
      }

      // Clear the form
      setFormData({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error updating credentials:', err);
      setError(err.message || 'An error occurred while updating credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Account Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="New Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder={adminInfo.username || 'Username'}
          helperText="Leave blank to keep current username"
          disabled={loading}
        />

        <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 1 }}>
          Change Password
        </Typography>
        
        <TextField
          margin="normal"
          fullWidth
          name="currentPassword"
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          id="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle current password visibility"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  edge="end"
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          name="newPassword"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          id="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle new password visibility"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<Save />}
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileManager;
