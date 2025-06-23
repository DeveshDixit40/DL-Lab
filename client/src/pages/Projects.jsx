import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CardActions, Button, Box } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import ScrollableCardsContainer from '../components/common/ScrollableCardsContainer';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Projects
        </Typography>
        
        <ScrollableCardsContainer>
          {projects.map((project) => (
            <Box key={project._id} sx={{ width: 350, mr: 2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={project.imageUrl}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  {project.technologies && (
                    <Typography variant="body2" color="primary">
                      {project.technologies.join(' • ')}
                    </Typography>
                  )}
                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Team: {project.teamMembers.join(', ')}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  {project.link && (
                    <Button 
                      size="small" 
                      color="primary" 
                      startIcon={<GitHubIcon />}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Box>
          ))}
        </ScrollableCardsContainer>
      </Box>
    </Container>
  );
};

export default Projects;
