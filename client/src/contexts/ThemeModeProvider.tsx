/**
 * @fileoverview Provides theme mode (light/dark) context for the app.
 */
import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeModeContext } from './useThemeMode';

/**
 * Provides theme mode state and toggle function to children.
 */
export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>((
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  ));

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
} 