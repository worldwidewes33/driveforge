/**
 * @fileoverview Generic authentication form component for both sign in and registration
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
  Person,
} from '@mui/icons-material';
import { useAuth } from '../useAuth';
import { useThemeMode } from '../../theme/useThemeMode';
import type { RegisterCredentials } from '../auth.types';

type AuthMode = 'signin' | 'register';

interface AuthFormProps {
  mode?: AuthMode;
  onNavigateToLanding?: () => void;
  onModeChange?: (mode: AuthMode) => void;
}

/**
 * Generic authentication form component for both sign in and registration
 * @param mode - Authentication mode ('signin' or 'register')
 * @param onNavigateToLanding - Optional callback to navigate back to landing page
 * @param onModeChange - Optional callback when switching between modes
 */
export function AuthForm({ mode , onNavigateToLanding, onModeChange }: AuthFormProps) {
  const { signIn, register, isLoading, error, clearError } = useAuth();
  const { mode: themeMode, toggleMode } = useThemeMode();
  
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<RegisterCredentials>>({});

  /**
   * Validate form fields
   * @param data - Form data to validate
   * @returns Object containing validation errors
   */
  const validateForm = useCallback((data: RegisterCredentials) => {
    const errors: Partial<RegisterCredentials> = {};
    
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
    
    if (mode === 'register') {
      if (!data.firstname) {
        errors.firstname = 'First name is required';
      }
      
      if (!data.lastname) {
        errors.lastname = 'Last name is required';
      }
      
      if (!data.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return errors;
  }, [mode]);

  /**
   * Handle form input changes
   * @param field - Field name to update
   * @param value - New field value
   */
  const handleInputChange = useCallback((field: keyof RegisterCredentials, value: string) => {
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
        if (mode === 'signin') {
          await signIn({ email: formData.email, password: formData.password });
        } else {
          await register(formData);
        }
      } catch (error) {
        // Error is handled by AuthProvider
        console.error(`${mode === 'signin' ? 'Sign in' : 'Registration'} failed:`, error);
      }
    }
  }, [formData, validateForm, signIn, register, mode]);

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
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </Typography>
          <Tooltip title={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={toggleMode}
              color="primary"
              sx={{ position: 'absolute', top: 16, right: 16 }}
              aria-label="toggle theme"
            >
              {themeMode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Paper>

        {/* Sign In Form */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {mode === 'signin' ? 'Welcome back' : 'Get started'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {mode === 'signin' 
                  ? 'Enter your credentials to access your files'
                  : 'Create an account to start storing your files'
                }
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

            {/* Registration Fields */}
            {mode === 'register' && (
              <>
                <TextField
                  fullWidth
                  label="First Name"
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => handleInputChange('firstname', e.target.value)}
                  error={!!formErrors.firstname}
                  helperText={formErrors.firstname}
                  disabled={isLoading}
                  slotProps={{
                    input: {startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}}
                  sx={{ mb: 2 }}
                  autoComplete="given-name"
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  error={!!formErrors.lastname}
                  helperText={formErrors.lastname}
                  disabled={isLoading}
                  slotProps={{
                    input: {startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}}
                  sx={{ mb: 2 }}
                  autoComplete="family-name"
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
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
                  autoComplete="new-password"
                />
              </>
            )}

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
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>

            {/* Navigation Links */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                <Link 
                  component="button"
                  type="button"
                  color="primary" 
                  underline="hover"
                  onClick={() => onModeChange?.(mode === 'signin' ? 'register' : 'signin')}
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
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

// Backward compatibility export
export const SignIn = (props: Omit<AuthFormProps, 'mode'>) => (
  <AuthForm {...props} mode="signin" />
);

export default AuthForm;