/**
 * @fileoverview Main application component that handles authentication routing and theme
 */

import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./features/landing/LandingPage";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { lightTheme, darkTheme } from "./features/theme/theme";
import { useThemeMode } from "./features/theme/useThemeMode";
import { useAuth } from "./features/auth/useAuth";

/**
 * @description Main app component that handles routing and theme
 */
export default function App() {
  const { mode } = useThemeMode();
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
