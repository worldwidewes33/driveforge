/**
 * @fileoverview Sign in component for user authentication
 */
import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Tooltip,
  InputAdornment,
  CircularProgress,
  Link,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useAuth } from './useAuth';
import { useThemeMode } from '../theme/useThemeMode';
import type { SignInCredentials } from './auth.types';

interface SignInProps {
  onNavigateToLanding?: () => void;
}

/**
 * Sign in component with email and password authentication
 * @param onNavigateToLanding - Optional callback to navigate back to landing page
 */
export function SignIn({ onNavigateToLanding }: SignInProps) {
  const { signIn, isLoading, error, clearError } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  
  const [formData, setFormData] = useState<SignInCredentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<SignInCredentials>>({});

  /**
   * Validate form fields
   * @param data - Form data to validate
   * @returns Object containing validation errors
   */
  const validateForm = useCallback((data: SignInCredentials) => {
    const errors: Partial<SignInCredentials> = {};
    
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  }, []);

  /**
   * Handle form input changes
   * @param field - Field name to update
   * @param value - New field value
   */
  const handleInputChange = useCallback((field: keyof SignInCredentials, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
    
    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  }, [formErrors, error, clearError]);

  /**
   * Handle form submission
   * @param event - Form submit event
   */
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        await signIn(formData);
      } catch (error) {
        // Error is handled by AuthProvider
        console.error('Sign in failed:', error);
      }
    }
  }, [formData, validateForm, signIn]);

  /**
   * Toggle password visibility
   */
  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 3, textAlign: 'center', position: 'relative' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            DriveForge
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Sign in to your account
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

        {/* Sign In Form */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Welcome back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your credentials to access your files
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
                {error}
              </Alert>
            )}

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={isLoading}
              slotProps={{
                input: {startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}}
              sx={{ mb: 2 }}
              autoComplete="email"
              autoFocus
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={isLoading}
              slotProps={{
               input:{ startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      disabled={isLoading}
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}}
              sx={{ mb: 3 }}
              autoComplete="current-password"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Navigation Links */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link href="#" color="primary" underline="hover">
                  Sign up
                </Link>
              </Typography>
              {onNavigateToLanding && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <Link
                    component="button"
                    type="button"
                    color="primary"
                    underline="hover"
                    onClick={onNavigateToLanding}
                  >
                    ← Back to home
                  </Link>
                </Typography>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignIn;