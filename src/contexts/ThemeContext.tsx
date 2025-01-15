import  { createContext, useState, useEffect, ReactNode } from 'react';

export const ThemeContext = createContext();


interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider:React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
