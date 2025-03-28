import {  Typography, Card, CardContent, Avatar, Box, useMediaQuery, Stack, keyframes } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const slideIn = keyframes`
  from {
    transform: translateX(100vw);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Lead AI Engineer',
    bio: 'Expert in deep learning and computer vision with 10+ years of experience in medical image analysis.',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait,1',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  {
    name: 'Jane Smith',
    role: 'Frontend Developer',
    bio: 'Specialized in React and modern web technologies with a focus on user experience and accessibility.',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait,2',
    github: 'https://github.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith',
  },
  {
    name: 'Mike Johnson',
    role: 'Backend Developer',
    bio: 'Experienced in building scalable backend systems and API development for healthcare applications.',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait,3',
    github: 'https://github.com/mikejohnson',
    linkedin: 'https://linkedin.com/in/mikejohnson',
  },
  {
    name: 'Sarah Williams',
    role: 'Medical AI Researcher',
    bio: 'PhD in Medical Imaging with expertise in developing AI models for disease detection and diagnosis.',
    avatar: 'https://source.unsplash.com/random/150x150/?portrait,4',
    github: 'https://github.com/sarahwilliams',
    linkedin: 'https://linkedin.com/in/sarahwilliams',
  },
];

const AboutPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

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
      <Box sx={{ 
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
        px: { xs: 2, md: 4 },
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Box sx={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About Our Team
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Meet the experts behind our AI-powered lung disease detection system
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ 
          maxWidth: '1200px',
          width: '100%'
        }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            sx={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'stretch'
            }}
          >
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: isMobile ? '100%' : 300,
                  maxWidth: isMobile ? '100%' : 300,
                  flex: '0 0 auto',
                  transition: 'transform 0.3s ease-in-out',
                  animation: `${slideIn} 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    src={member.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.main',
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {member.name}
                  </Typography>
                  <Typography color="primary" gutterBottom sx={{ mb: 2 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {member.bio}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit' }}
                    >
                      <GitHubIcon sx={{ fontSize: 28, '&:hover': { color: 'primary.main' } }} />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit' }}
                    >
                      <LinkedInIcon sx={{ fontSize: 28, '&:hover': { color: 'primary.main' } }} />
                    </a>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage; 