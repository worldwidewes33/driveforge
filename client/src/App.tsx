/**
 * @fileoverview Main application component that handles authentication routing and theme
 */

import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './features/landing/LandingPage';
import SignIn from './features/auth/SignIn';
import { lightTheme, darkTheme } from './features/theme/theme';
import { useThemeMode } from './features/theme/useThemeMode';
import { useAuth } from './features/auth/useAuth';

/**
 * @description Main app component that handles authentication routing and theme
 */
export default function App() {
  const { mode } = useThemeMode();
  const { isAuthenticated } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  /**
   * Navigate to sign in page
   */
  const handleNavigateToSignIn = () => {
    setShowSignIn(true);
  };

  /**
   * Navigate back to landing page
   */
  const handleNavigateToLanding = () => {
    setShowSignIn(false);
  };

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <LandingPage />
      ) : showSignIn ? (
        <SignIn onNavigateToLanding={handleNavigateToLanding} />
      ) : (
        <LandingPage onNavigateToSignIn={handleNavigateToSignIn} />
      )}
    </ThemeProvider>
  );
} 