import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  useTheme,
  Divider
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff, PersonAdd, Lock as LockIcon } from '@mui/icons-material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    registrationCode: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          registrationCode: formData.registrationCode
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 270px)', md: 'calc(100vh - 300px)' },
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}11, ${theme.palette.secondary.main}11)`,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={loading ? 0 : 3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <Box
            component="img"
            src="/logo.png"
            alt="Deep Learning Lab Logo"
            sx={{
              width: '80px',
              height: '80px',
              mb: 2,
              animation: loading ? 'pulse 1.5s infinite' : 'none',
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.6 },
                '100%': { opacity: 1 },
              },
            }}
          />

          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Admin Registration
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                animation: 'slideDown 0.3s ease',
                '@keyframes slideDown': {
                  from: { transform: 'translateY(-20px)', opacity: 0 },
                  to: { transform: 'translateY(0)', opacity: 1 },
                },
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                width: '100%', 
                mb: 2,
                animation: 'slideDown 0.3s ease',
                '@keyframes slideDown': {
                  from: { transform: 'translateY(-20px)', opacity: 0 },
                  to: { transform: 'translateY(0)', opacity: 1 },
                },
              }}
            >
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="registrationCode"
              label="Registration Code"
              type="password"
              id="registrationCode"
              value={formData.registrationCode}
              onChange={handleChange}
              disabled={loading}
              helperText="Enter the admin registration code provided by the administrator"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={<PersonAdd />}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'translateX(100%)',
                },
              }}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Already have an account?
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<LockIcon />}
                sx={{
                  py: 1,
                  width: '100%',
                  maxWidth: '200px',
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          Deep Learning Lab - IIIT Allahabad © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default SignUp;
