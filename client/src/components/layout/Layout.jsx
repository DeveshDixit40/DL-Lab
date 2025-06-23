import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '400px',
            background: 'linear-gradient(180deg, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 100%)',
            zIndex: 0,
            pointerEvents: 'none',
          },
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            position: 'relative',
            zIndex: 1,
            pt: { xs: 4, md: 6 },
            pb: { xs: 6, md: 8 },
          }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
