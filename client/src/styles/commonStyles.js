export const pageHeadingStyles = {
  mb: { xs: 4, md: 6 },
  textAlign: 'center',
  '& h1': {
    fontSize: { xs: '2rem', md: '2.5rem' },
    fontWeight: 700,
    color: 'text.primary',
    mb: 2,
  },
  '& .MuiTypography-subtitle1': {
    color: 'text.secondary',
    maxWidth: '800px',
    mx: 'auto',
  },
};

export const sectionHeadingStyles = {
  mb: 4,
  '& h2': {
    fontSize: { xs: '1.75rem', md: '2rem' },
    fontWeight: 700,
    color: 'text.primary',
    mb: 1,
  },
  '& .MuiTypography-subtitle1': {
    color: 'text.secondary',
  },
};

export const cardStyles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px -5px rgba(0,0,0,0.1), 0 4px 12px -2px rgba(0,0,0,0.05)',
  },
};

export const cardMediaStyles = {
  pt: '56.25%', // 16:9 aspect ratio
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.1) 100%)',
  },
};

export const cardContentStyles = {
  flexGrow: 1,
  p: 3,
};

export const cardActionStyles = {
  p: 2,
  pt: 0,
};

export const buttonStyles = {
  textTransform: 'none',
  borderRadius: '8px',
  px: 3,
  py: 1,
};

export const gridContainerStyles = {
  spacing: { xs: 2, md: 3 },
  mt: { xs: 2, md: 3 },
};

export const paperStyles = {
  p: { xs: 2, md: 3 },
  height: '100%',
  borderRadius: 2,
  bgcolor: 'background.paper',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px -5px rgba(0,0,0,0.1), 0 4px 12px -2px rgba(0,0,0,0.05)',
  },
};
