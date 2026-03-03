import { useEffect, useState } from 'react';
import AppRouter from './router/AppRouter';
import type { ThemeMode } from './types/theme';

const themeStorageKey = 'bud-theme';

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem(themeStorageKey);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  const onToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <AppRouter theme={theme} onToggleTheme={onToggleTheme} />;
}

export default App;
