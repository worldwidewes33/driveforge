/**
 * @fileoverview Main App component for DriveForge
 * Demonstrates Material UI setup with basic layout and theme toggle
 */

import { Box, Container, Typography, Button, Paper, IconButton, Tooltip } from '@mui/material';
import { CloudUpload, Folder, Storage, DarkMode, LightMode, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../theme/useThemeMode';
import { useAuth } from '../auth/useAuth';

function LandingPage() {
  const { mode, toggleMode } = useThemeMode();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, textAlign: 'center', position: 'relative' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            DriveForge
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your AI-Powered Cloud Storage Solution
          </Typography>
          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={toggleMode}
              color="primary"
              sx={{ position: 'absolute', top: 16, right: 16 }}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Paper>

        {/* Feature Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Storage sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Secure Storage
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Store your files securely with enterprise-grade encryption
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Folder sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Smart Organization
            </Typography>
            <Typography variant="body1" color="text.secondary">
              AI-powered folder suggestions and intelligent file organization
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Easy Upload
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Drag and drop file uploads with progress tracking
            </Typography>
          </Paper>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          {isAuthenticated ? (
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<CloudUpload />}
              sx={{ px: 4, py: 1.5 }}
            >
              Upload Files
            </Button>
          ) : (
            <>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<CloudUpload />}
                onClick={() => navigate('/signup')}
                sx={{ px: 4, py: 1.5, mr: 2 }}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<Login />}
                onClick={() => navigate('/signin')}
                sx={{ px: 4, py: 1.5 }}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage; 