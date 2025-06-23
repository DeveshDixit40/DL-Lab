import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';

const Events = () => {
  const events = [
    {
      title: 'Deep Learning Workshop',
      date: 'June 15, 2025',
      description: 'Hands-on workshop covering the fundamentals of deep learning and neural networks.',
      location: 'Main Auditorium'
    },
    {
      title: 'AI Research Symposium',
      date: 'July 1, 2025',
      description: 'Annual symposium featuring presentations from leading AI researchers.',
      location: 'Conference Hall'
    },
    {
      title: 'Machine Learning Hackathon',
      date: 'July 20, 2025',
      description: 'A 24-hour hackathon focused on solving real-world problems using ML.',
      location: 'Innovation Lab'
    }
  ];

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Upcoming Events
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {events.map((event, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {event.date}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Location: {event.location}
                  </Typography>
                  <Typography variant="body2">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                  <Button size="small" color="primary">
                    Register
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Events;