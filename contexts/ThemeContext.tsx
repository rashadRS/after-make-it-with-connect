'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
const KEY = 'studytech_theme';
const ThemeContext = createContext<{theme: Theme; toggle: ()=>void} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const saved = localStorage.getItem(KEY) as Theme | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(KEY, theme);
  }, [theme]);
  const value = useMemo(() => ({ theme, toggle: () => setTheme((t) => t === 'dark' ? 'light' : 'dark') }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => { const c = useContext(ThemeContext); if (!c) throw new Error('theme missing'); return c; };
