import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize dark mode state with smart fallbacks
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_dark_mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Fallback to system hardware preference if local cache is empty
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return true; // Default application fallback base
    } catch {
      return true;
    }
  });

  // Sync state modifications with localStorage and HTML engine nodes
  useEffect(() => {
    try {
      localStorage.setItem('taskflow_dark_mode', JSON.stringify(darkMode));
    } catch (error) {
      console.warn('Storage sync skipped: ', error);
    }

    const rootNode = document.documentElement;
    if (darkMode) {
      rootNode.classList.add('dark');
      rootNode.style.colorScheme = 'dark'; // Optimizes native scrollbars/form controls for glass layout
    } else {
      rootNode.classList.remove('dark');
      rootNode.style.colorScheme = 'light';
    }
  }, [darkMode]);

  // Listen to live OS system theme updates dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaMatcher = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      // Only auto-update if user hasn't explicitly set a preference in local storage
      if (!localStorage.getItem('taskflow_dark_mode')) {
        setDarkMode(e.matches);
      }
    };

    // Support both modern and legacy event listeners
    if (mediaMatcher.addEventListener) {
      mediaMatcher.addEventListener('change', handleSystemThemeChange);
    } else {
      mediaMatcher.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaMatcher.removeEventListener) {
        mediaMatcher.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaMatcher.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  // Structural memo payload wrap to enforce render isolation bounds
  const themePayload = useMemo(() => ({
    darkMode,
    setDarkMode,
    toggleTheme: () => setDarkMode(prev => !prev) // Clean utility method for toggle buttons
  }), [darkMode]);

  return (
    <ThemeContext.Provider value={themePayload}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme context consumer must be initialized inside an active ThemeProvider wrapper.');
  }
  return context;
};