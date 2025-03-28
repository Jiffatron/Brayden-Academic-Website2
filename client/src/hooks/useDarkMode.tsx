import { useState, useEffect } from 'react';

export function useDarkMode(): [boolean, () => void] {
  // Initialize to dark mode by default
  const [isDarkMode, setIsDarkMode] = useState(true);

  // On initial mount, check for saved preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
    }
  }, []);

  // Save preference when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Toggle function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleDarkMode];
}
