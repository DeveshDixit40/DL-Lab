import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, CardActions, Button, Box, Chip } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import ScrollableCardsContainer from '../components/common/ScrollableCardsContainer';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Courses
        </Typography>
        
        <ScrollableCardsContainer>
          {courses.map((course) => (
            <Box key={course._id} sx={{ width: 350, mr: 2 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {course.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.imageUrl}
                    alt={course.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    Instructor: {course.instructor}
                  </Typography>
                  {course.duration && (
                    <Chip 
                      label={`Duration: ${course.duration}`}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  )}
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>
                  
                  {course.syllabus && course.syllabus.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Course Content:
                      </Typography>
                      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                        {course.syllabus.map((item, index) => (
                          <li key={index}>
                            <Typography variant="body2">{item}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  {course.enrollmentLink && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SchoolIcon />}
                      href={course.enrollmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      Enroll Now
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

export default Courses;
