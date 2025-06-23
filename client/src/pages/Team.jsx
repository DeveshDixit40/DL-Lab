import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Box, IconButton, Link } from '@mui/material';
import { LinkedIn, GitHub, Twitter } from '@mui/icons-material';
import ScrollableCardsContainer from '../components/common/ScrollableCardsContainer';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/team`);
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const SocialLinks = ({ links }) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
      {links.linkedin && (
        <IconButton
          component={Link}
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          <LinkedIn />
        </IconButton>
      )}
      {links.github && (
        <IconButton
          component={Link}
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          <GitHub />
        </IconButton>
      )}
      {links.twitter && (
        <IconButton
          component={Link}
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          <Twitter />
        </IconButton>
      )}
    </Box>
  );

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Our Team
        </Typography>
        
        <ScrollableCardsContainer>
          {teamMembers.map((member) => (
            <Box key={member._id} sx={{ width: 300, mr: 2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={member.imageUrl}
                  alt={member.name}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  {member.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {member.description}
                    </Typography>
                  )}
                  {member.email && (
                    <Typography variant="body2" color="text.secondary">
                      {member.email}
                    </Typography>
                  )}
                  {member.socialLinks && (
                    <SocialLinks links={member.socialLinks} />
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </ScrollableCardsContainer>
      </Box>
    </Container>
  );
};

export default Team;
