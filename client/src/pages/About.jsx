import React from 'react';
import { Container, Typography, Grid, Paper, Box, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DevicesIcon from '@mui/icons-material/Devices';

const About = () => {
  const theme = useTheme();

  return (
    <Container>
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
          About Deep Learning Lab IIITA
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                mb: 6
              }}
            >
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Our lab is dedicated to exploring the exciting field of Deep Learning, which is a subfield of Artificial Intelligence (AI) that focuses on creating algorithms and models inspired by the structure and function of the human brain.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                We believe that Deep Learning has the potential to revolutionize many areas of society, from healthcare to finance to transportation, and we are committed to contributing to this exciting field through our research, teaching, and collaboration with other researchers and practitioners.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 4
            }}
          >
            What We Do
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  At our lab, we use state-of-the-art technologies, tools, and techniques to develop and train complex deep neural networks. Our research interests span a wide range of applications, including image and speech recognition, natural language processing, robotics, and more.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  Our lab is home to a diverse and talented team of researchers, graduate students, and undergraduates, who work together to advance the state-of-the-art in Deep Learning. We also offer opportunities for undergraduate and graduate students to participate in our research projects and gain hands-on experience with cutting-edge technologies.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default About;