/**
 * @fileoverview Provides ThemedApp component which applies theme and context providers.
 */

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { lightTheme, darkTheme } from '../utils/theme';
import { useThemeMode } from '../contexts/useThemeMode';

/**
 * @description ThemedApp wraps App with MUI ThemeProvider and applies current theme mode.
 */
export default function ThemedApp() {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
} 