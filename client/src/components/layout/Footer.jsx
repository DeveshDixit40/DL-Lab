import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const quickLinks = [
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Publications', path: '/publications' },
    { label: 'Team', path: '/team' },
  ];

  const resources = [
    { label: 'Courses', path: '/courses' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Internships', path: '/internships' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo and Description */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                Deep Learning Lab IIITA
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Advancing the field of artificial intelligence through innovative research,
              education, and collaboration at IIIT Allahabad.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" component={MuiLink} href="https://github.com/BDA-IIITA" target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton color="primary" component={MuiLink} href="https://www.linkedin.com/in/deep-learning-lab-iiita-19092b34b/?originalSubdomain=in" target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" component={MuiLink} href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" component={MuiLink} href="mailto:dll@iiita.ac.in">
                <EmailIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Spacer */}
          <Grid item xs={false} md={2} />

          {/* Quick Links and Resources Container */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={4} mr={6}>
              {/* Quick Links */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Quick Links
                </Typography>
                <Stack spacing={1}>
                  {quickLinks.map((link) => (
                    <MuiLink
                      key={link.path}
                      component={Link}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Stack>
              </Grid>

              {/* Resources */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Resources
                </Typography>
                <Stack spacing={1}>
                  {resources.map((link) => (
                    <MuiLink
                      key={link.path}
                      component={Link}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.label}
                    </MuiLink>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Deep Learning Lab, IIIT Allahabad. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;