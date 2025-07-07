/**
 * @fileoverview Hook and context for accessing theme mode (light/dark) in the app.
 */
import { useContext, createContext } from "react";

export interface ThemeModeContextValue {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

/**
 * Custom hook to access theme mode context.
 * @returns {ThemeModeContextValue} The current theme mode and toggle function.
 */
export function useThemeMode(): ThemeModeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode must be used within a ThemeModeProvider");
  return ctx;
}
