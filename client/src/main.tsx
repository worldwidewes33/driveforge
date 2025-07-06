/**
 * @fileoverview Main entry point for DriveForge client application
 * Sets up React with Material UI theme provider and theme mode context
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from "./App.tsx";
import { lightTheme, darkTheme } from './theme';
import { ThemeModeProvider, useThemeMode } from './ThemeModeContext';

function ThemedApp() {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </StrictMode>
);
