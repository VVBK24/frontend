import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflow: 'hidden',
      bgcolor: 'background.default'
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          width: '100vw',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          margin: 0
        }}
      >
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: { xs: 2, md: 4 }
        }}>
          <Box sx={{ maxWidth: '1200px' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                fontWeight: 'bold',
              }}
            >
              AI-Powered Lung Disease Detection
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                mb: 3,
              }}
            >
              Advanced diagnosis using state-of-the-art deep learning models
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/predict')}
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        width: '100vw',
        bgcolor: 'background.paper',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4}
          sx={{ maxWidth: '1200px', width: '100%' }}
        >
          <Box flex={1}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <ScienceIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom align="center">
                Advanced AI Models
              </Typography>
              <Typography align="center" color="text.secondary">
                Utilizing VGG16, MobileNetV2, ResNet-50, and EfficientNet-B0 for accurate diagnosis
              </Typography>
            </Paper>
          </Box>
          <Box flex={1}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <SpeedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom align="center">
                Fast Results
              </Typography>
              <Typography align="center" color="text.secondary">
                Quick and accurate analysis of chest X-rays and CT scans
              </Typography>
            </Paper>
          </Box>
          <Box flex={1}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom align="center">
                Secure & Reliable
              </Typography>
              <Typography align="center" color="text.secondary">
                Your medical data is handled with the highest security standards
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default LandingPage; 