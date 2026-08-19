'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  mounted: false,
  setTheme: () => {},
  toggle: () => {},
});

function apply(theme: Theme) {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  el.classList.toggle('dark', theme === 'dark');
  el.classList.toggle('light', theme === 'light');
  el.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR + first client render default to 'light' (standard design).
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initial: Theme = 'light';
    try {
      const w = window as unknown as { __theme?: Theme };
      const stored = w.__theme || (localStorage.getItem('theme-v2') as Theme | null);
      if (stored === 'light' || stored === 'dark') initial = stored;
    } catch {
      /* ignore */
    }
    setThemeState(initial);
    apply(initial);
    setMounted(true);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem('theme-v2', t);
    } catch {
      /* ignore */
    }
    apply(t);
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme-v2', next);
      } catch {
        /* ignore */
      }
      apply(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mounted, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
