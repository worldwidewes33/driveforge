/**
 * @fileoverview Main entry point for DriveForge client application
 * Sets up React with Material UI theme provider and theme mode context
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemedApp from "./components/ThemedApp";
import { ThemeModeProvider } from './contexts/ThemeModeProvider';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </StrictMode>
);
