/**
 * @fileoverview Main entry point for DriveForge client application
 * Sets up React with Material UI theme provider and theme mode context
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeModeProvider } from './features/theme/ThemeModeProvider';
import { AuthProvider } from './features/auth/AuthProvider';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>
);
