import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Link } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import ScrollableCardsContainer from '../components/common/ScrollableCardsContainer';

const Publications = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/publications`);
        const data = await response.json();
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Publications
        </Typography>
        
        <ScrollableCardsContainer>
          {publications.map((publication) => (
            <Box key={publication._id} sx={{ width: 400, mr: 2 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {publication.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {publication.authors}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {publication.conference} ({publication.year})
                  </Typography>
                  {publication.abstract && (
                    <Typography variant="body2" paragraph>
                      {publication.abstract}
                    </Typography>
                  )}
                  {publication.link && (
                    <Link
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      View Publication
                      <OpenInNewIcon fontSize="small" />
                    </Link>
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

export default Publications;
