import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Box, IconButton, Link } from '@mui/material';
import { LinkedIn, Twitter, Email } from '@mui/icons-material';
import ScrollableCardsContainer from '../components/common/ScrollableCardsContainer';

const Internships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/internships`);
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Internships
        </Typography>

        <ScrollableCardsContainer>
          {internships.map((internship) => (
            <Box key={internship._id} sx={{ width: 300, mr: 2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {internship.imageUrl && (
                  <CardMedia
                    component="img"
                    height="300"
                    image={internship.imageUrl}
                    alt={internship.personName || internship.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {internship.title}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {internship.company}
                  </Typography>
                  {internship.personName && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        {internship.personName}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {internship.personTitle}
                      </Typography>
                    </>
                  )}
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {internship.description}
                  </Typography>
                  {internship.socialLinks && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {internship.socialLinks.linkedin && (
                        <IconButton
                          component={Link}
                          href={internship.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          size="small"
                        >
                          <LinkedIn />
                        </IconButton>
                      )}
                      {internship.socialLinks.twitter && (
                        <IconButton
                          component={Link}
                          href={internship.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          size="small"
                        >
                          <Twitter />
                        </IconButton>
                      )}
                      {internship.socialLinks.email && (
                        <IconButton
                          component={Link}
                          href={`mailto:${internship.socialLinks.email}`}
                          color="primary"
                          size="small"
                        >
                          <Email />
                        </IconButton>
                      )}
                    </Box>
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

export default Internships;
