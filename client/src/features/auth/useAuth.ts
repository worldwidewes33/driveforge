/**
 * @fileoverview Hook and context for accessing authentication state in the app
 */
import { useContext, createContext } from 'react';
import type { AuthContextValue } from './auth.types';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Custom hook to access authentication context
 * @returns {AuthContextValue} The current auth state and auth functions
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}