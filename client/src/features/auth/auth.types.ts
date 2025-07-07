/**
 * @fileoverview TypeScript type definitions for authentication-related data structures
 */

export interface User {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: 'success' | 'error' | 'fail';
  data: {
    user?: User;
    jwt?: string;
    message?: string;
  }
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
}