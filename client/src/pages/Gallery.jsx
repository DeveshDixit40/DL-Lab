import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardMedia, Modal, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ScrollableCardsContainer from '../components/common/ScrollableCardsContainer';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gallery`);
        const data = await response.json();
        setGallery(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Gallery
        </Typography>
        
        <ScrollableCardsContainer>
          {gallery.map((item) => (
            <Box 
              key={item._id} 
              sx={{ 
                width: 300,
                mr: 2,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease-in-out'
                }
              }}
              onClick={() => handleImageClick(item)}
            >
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.imageUrl}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Box>
          ))}
        </ScrollableCardsContainer>

        <Modal
          open={Boolean(selectedImage)}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ 
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: -40,
                top: -40,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <Card>
                <CardMedia
                  component="img"
                  image={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  sx={{
                    maxHeight: '90vh',
                    objectFit: 'contain',
                  }}
                />
                <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="h6">
                    {selectedImage.title}
                  </Typography>
                  {selectedImage.description && (
                    <Typography variant="body2" color="text.secondary">
                      {selectedImage.description}
                    </Typography>
                  )}
                </Box>
              </Card>
            )}
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default Gallery;
