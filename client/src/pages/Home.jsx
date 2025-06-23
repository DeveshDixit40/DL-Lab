import React from 'react';
import { Container, Typography, Grid, Paper, Box, Card, CardContent, useTheme, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BuildIcon from '@mui/icons-material/Build';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  
  const missionCards = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "ML and AI",
      description: "The mission of deep learning is to advance the state of the art in machine learning and artificial intelligence. This can be accomplished by conducting research, developing new algorithms, and applying these techniques to real-world problems"
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Innovate Solutions",
      description: "Our mission in deep learning should be to create innovative solutions to challenging problems that cannot be solved by traditional machine learning algorithms. This may involve developing new techniques or modifying existing ones to suit specific applications."
    },
    {
      icon: <BuildIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Latest Tools",
      description: "To accomplish this mission, we have access to the latest hardware and software tools to support its research. It should also have a team of skilled researchers and developers who are knowledgeable in the latest trends and techniques in deep learning."
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Collaboration",
      description: "The lab also collaborates with other researchers and organizations in academia and industry to share knowledge, resources, and ideas. This will help to promote innovation and accelerate progress in this rapidly evolving field."
    }
  ];
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}11, ${theme.palette.secondary.main}11)`,
          py: { xs: 8, md: 12 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" sx={{ position: 'relative' }}>
            <Grid item xs={12} md={7}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.75rem' },
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Deep Learning Lab IIITA
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                  paragraph
                  sx={{ mb: 4 }}
                >
                  Pushing AI boundaries through research, education, and collaboration.
                </Typography>
                <Button 
                  component={Link}
                  to="/about"
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    mr: 2,
                    px: 4,
                    py: 1.5,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={5}
              sx={{
                position: { md: 'absolute' },
                right: { md: 0 },
                top: { md: '50%' },
                transform: { md: 'translateY(-50%)' },
                zIndex: 1
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Deep Learning Lab"
                sx={{
                  width: '70%',
                  maxWidth: { xs: 300, md: 400 },
                  height: 'auto',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                  },
                  ml: { md: 4 },
                  display: 'block',
                  mx: 'auto'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="xl">
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 6
            }}
          >
            Our Mission
          </Typography>
          <Grid container spacing={4}>
            {missionCards.map((card, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    backgroundColor: 'transparent',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ mb: 2 }}>{card.icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Vision Section */}
        <Box sx={{ py: 8, backgroundColor: 'background.paper', borderRadius: 4 }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 6
              }}
            >
              Our Vision
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
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
                The vision of our deep learning is to continue advancing the state-of-the-art in AI and to solve increasingly complex problems. This includes improving the accuracy and efficiency of deep learning models, developing new architectures and techniques for training neural networks, and expanding the scope of applications for deep learning.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
                We are currently exploring ways to enhance the interpretability and explainability of deep learning models, which will be critical for their use in high-stakes applications such as healthcare, finance, cyber security, computational intelligence and autonomous systems.
              </Typography>

              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Overall, the vision of our lab is to create intelligent systems that can learn, reason, and interact with the world in a human-like way, ultimately leading to a more intelligent and productive society.
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default Home;