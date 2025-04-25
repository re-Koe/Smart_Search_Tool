import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import constructionImage from '../assets/images/wip.png';
import { keyframes } from '@mui/system';

const About = () => {
  const navigate = useNavigate();

  // Define animations
  const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); }
  `;

  const shimmer = keyframes`
    0% { background-position: -468px 0; }
    100% { background-position: 468px 0; }
  `;

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="90vh" 
      textAlign="center"
    >
      <Typography 
        variant="h4" 
        component="h4" 
        gutterBottom
        mb={10}
        sx={{
          fontSize: { xs: '1.5rem', sm: '1.5rem', md: '1.5rem' },
          fontWeight: '200',
        }}
      >
        About Page
      </Typography>
      <Box
        component="img"
        src={constructionImage}
        alt="Construction"
        sx={{
          width: { xs: '200px', sm: '250px', md: '200px' },
          height: 'auto',
          mb: 4,
        }}
      />
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '3rem', md: '3rem' },
          fontWeight: '300',
        }}
      >
        Under Construction
      </Typography>

      <Typography 
        variant="h4" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '1.5rem' },
          fontWeight: '200',
        }}
      >
      </Typography>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '1rem', md: '1.0rem' },
          mb: 4,
          fontWeight: '200',
        }}
      >
        While you wait for us to update this page down the line, check out our existing features!
      </Typography>

      <Box sx={{ width: { xs: '80%', sm: '50%', md: '30%' }, mb: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={60} 
          sx={{
            height: 20,
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundImage: `linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 100%
              )`,
              backgroundSize: '468px 468px',
              animation: `${shimmer} 2s linear infinite`,
            }
          }}
        />
      </Box>

      <Button 
        variant="contained" 
        size="large"
        onClick={() => navigate('/smart-search')}
        sx={{
          mt: 2,
          px: 8,
          py: 1,
          borderRadius: 10,
          textTransform: 'none',
          fontSize: { xs: '1rem', sm: '1.0rem' },
          fontWeight: '300',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          },
          '&:active': {
            transform: 'translateY(-1px)',
          },
          animation: `${pulse} 1.5s ease-in-out infinite`,
        }}
      >
        View Features
      </Button>
    </Box>
  );
};

export default About;