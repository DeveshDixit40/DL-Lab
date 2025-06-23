import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Publications', path: '/publications' },
    { label: 'Projects', path: '/projects' },
    { label: 'Internships', path: '/internships' },
    { label: 'Courses', path: '/courses' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Team', path: '/team' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ py: 2 }}>
        <img src="/logo.png" alt="Deep Learning Lab Logo" style={{ height: '40px' }} />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            component={Link} 
            to={item.path}
            sx={{
              color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
              bgcolor: location.pathname === item.path ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem component={Link} to="/login">
          <ListItemText primary="Login" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{
        bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component={Link} to="/" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            color: 'inherit',
            flexGrow: { xs: 1, md: 0 },
          }}>
            <img 
              src="/logo.png" 
              alt="Deep Learning Lab Logo" 
              style={{ 
                height: '40px', 
                marginRight: '10px',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            {!isMobile && (
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                }}
              >
                Deep Learning Lab IIITA
              </Typography>
            )}
          </Box>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary,
                    '&:hover': {
                      bgcolor: 'rgba(37, 99, 235, 0.1)',
                    },
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '0',
                      left: '50%',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bgcolor: 'primary.main',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                    px: 1.5,
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                component={Link}
                to="/login"
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{
                  ml: 2,
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                  px: 3,
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            bgcolor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;