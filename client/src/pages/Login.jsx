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
  useTheme
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";
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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        if (!data.token || !data.admin) {
          setError('Invalid server response');
          return;
        }
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminInfo', JSON.stringify(data.admin));
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Login failed');
      }    } catch (err) {
      console.error('Login network error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 270px)', md: 'calc(100vh - 300px)' }, // Accounting for navbar, footer, and padding
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
            Admin Login
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
              autoComplete="current-password"
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
            />            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={<LockIcon />}
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Need an admin account?
              </Typography>
              <Button
                component={Link}
                to="/signup"
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Register here
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

export default Login;