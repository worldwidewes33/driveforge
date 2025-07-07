/**
 * @fileoverview Provides authentication context for the app
 */
import { useState, useCallback, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./useAuth";
import type {
  User,
  AuthState,
  SignInCredentials,
  RegisterCredentials,
  AuthResponse,
} from "./auth.types";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * Provides authentication state and functions to children components
 * @param children - React child components
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const jwt = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (jwt && userData) {
      try {
        const user = JSON.parse(userData) as User;
        setAuthState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
        }));
      } catch {
        // Clear invalid data
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  /**
   * Sign in user with email and password
   * @param credentials - User email and password
   */
  const signIn = useCallback(async (credentials: SignInCredentials): Promise<void> => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const authResponse: AuthResponse = await response.json();
      const { data, status } = authResponse;

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      if (status === "success" && data.user && data.jwt) {
        // Store jwt and user data
        localStorage.setItem("authToken", data.jwt);
        localStorage.setItem("userData", JSON.stringify(data.user));

        setAuthState({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(data.message || "Authentication failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred during sign in";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Register user with email and password
   * @param credentials - User email and password
   */
  const register = useCallback(async (credentials: RegisterCredentials) => {
    setAuthState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const authResponse: AuthResponse = await response.json();
      const { data, status } = authResponse;

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      if (status === "success" && data.user && data.jwt) {
        localStorage.setItem("authToken", data.jwt);
        localStorage.setItem("userData", JSON.stringify(data.user));

        setAuthState({
          user: data.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred during registration";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, []);

  /**
   * Sign out user and clear auth state
   */
  const signOut = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  /**
   * Clear authentication error
   */
  const clearError = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      error: authState.error,
      signIn,
      signOut,
      register,
      clearError,
    }),
    [authState, signIn, signOut, register, clearError]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
