/**
 * @fileoverview Context and hook for managing Material UI theme mode (light/dark)
 */
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeModeContextValue {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

/**
 * Provides theme mode state and toggle function to children.
 */
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

/**
 * Custom hook to access theme mode context.
 */
export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within a ThemeModeProvider');
  return ctx;
} 