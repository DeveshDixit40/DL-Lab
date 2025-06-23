import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';

const ScrollableCardsContainer = ({ children, height = 'auto' }) => {

  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({ isStart: true, isEnd: false });
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const isStart = scrollLeft === 0;
      const isEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) < 1;
      setScrollPosition({ isStart, isEnd });
      setIsOverflowing(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    // Add check after images and content are loaded
    const timer = setTimeout(checkScroll, 1000);
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [children]);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mb: 4 }}>
      <Box
        ref={containerRef}
        onScroll={checkScroll}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            display: 'none'
          },          gap: 3,
          py: 2,
          px: isOverflowing ? 2 : 0,
          height: height,
          '& > *': {
            flex: '0 0 auto',
            minWidth: 0
          }
        }}
      >
        {children}
      </Box>
      {!scrollPosition.isStart && isOverflowing && (
        <IconButton
          onClick={() => handleScroll('left')}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            boxShadow: 3,
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: 'background.paper',
              opacity: 0.9
            },
            zIndex: 2
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
      )}
      {!scrollPosition.isEnd && isOverflowing && (
        <IconButton
          onClick={() => handleScroll('right')}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            boxShadow: 3,
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: 'background.paper',
              opacity: 0.9
            },
            zIndex: 2
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      )}
    </Box>
  );
};

export default ScrollableCardsContainer;
