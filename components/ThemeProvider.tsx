import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';
import { SpaceBackground } from './SpaceBackground';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <>
      {theme === 'space' && <SpaceBackground />}
      {children}
    </>
  );
};

