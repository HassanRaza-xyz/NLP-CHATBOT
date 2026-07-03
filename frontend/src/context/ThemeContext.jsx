/**
 * ThemeContext.jsx
 * 
 * React Context for managing dark/light mode across the application.
 * Persists user preference in localStorage and applies the 'dark' CSS class
 * to the <html> element (required for Tailwind CSS dark mode: 'class' strategy).
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context with default undefined value
const ThemeContext = createContext(undefined);

/**
 * ThemeProvider wraps the entire app and provides dark/light mode state.
 * Children can access theme values using the useTheme() hook.
 */
export function ThemeProvider({ children }) {
  // Initialize from localStorage, defaulting to dark mode
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('nlp-chatbot-theme');
      if (saved !== null) return saved === 'dark';
    } catch {}
    // Default to dark mode for premium feel
    return true;
  });

  // Apply/remove the 'dark' class on <html> when isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Persist preference
    try {
      localStorage.setItem('nlp-chatbot-theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  /**
   * Toggle between dark and light mode.
   */
  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to consume the ThemeContext.
 * Must be used within a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
