import React from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Grid, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import LinkIcon from '@mui/icons-material/Link';

const Contact = () => {
  const theme = useTheme();

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Address",
      details: [
        "DEEP LEARNING LAB (DLL)",
        "5143, First Floor, CV Raman Computer Center (CC-3)",
        "Indian Institute of Information Technology - Allahabad",
        "Devghat, Jhalwa, Allahabad-211015",
        "Uttar Pradesh, INDIA"
      ]
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Phone",
      details: ["+91-532-2922092", "+91-532-2922632"]
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Email",
      details: ["dll@iiita.ac.in"],
      isLink: true
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={4}>
          {/* Left Side - Contact Form */}
          <Grid item xs={12} lg={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                height: '100%'
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                align="center"
                sx={{ 
                  fontWeight: 600,
                  mb: 4 
                }}
              >
                Send us a Message
              </Typography>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      type="email"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={1}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      startIcon={<SendIcon />}
                      sx={{
                        py: 1.5,
                        mt: 2
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Right Side - Contact Information */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ height: '100%' }}>
              {/* Contact Information Cards */}
              <Grid container spacing={3}>
                {contactInfo.map((info, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box sx={{ mr: 2, pt: 0.5 }}>
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography 
                            variant="h6" 
                            component="h3" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600,
                              color: theme.palette.primary.main 
                            }}
                          >
                            {info.title}
                          </Typography>
                          {info.details.map((detail, idx) => (
                            <Typography 
                              key={idx} 
                              variant="body1" 
                              color="text.secondary"
                              component={info.isLink ? 'a' : 'p'}
                              href={info.isLink ? `mailto:${detail}` : undefined}
                              sx={{ 
                                mb: 0.5,
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': info.isLink ? {
                                  color: theme.palette.primary.main,
                                } : undefined
                              }}
                            >
                              {detail}
                              {info.isLink && (
                                <LinkIcon sx={{ ml: 1, fontSize: '1rem', opacity: 0.7 }} />
                              )}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Map */}
              <Paper 
                elevation={0}
                sx={{ 
                  mt: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.2519391747466!2d81.77028867529658!3d25.430064577526623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398533530cce2e67%3A0xab44674d2e9408a2!2sIIIT%20Allahabad!5e0!3m2!1sen!2sin!4v1684644159139!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;