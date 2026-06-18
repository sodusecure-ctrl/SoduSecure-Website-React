'use client';

import { useLocale } from 'next-intl';
import { useTheme } from '@/components/theme/ThemeProvider';
import HomeClient from './HomeClient';
import CorporateLanding from '@/app/corporate/CorporateLanding';

export default function HomeThemeSwitch() {
  const { theme, mounted } = useTheme();
  const locale = useLocale();

  // SSR + first client paint render the dark HomeClient (default, good for SEO).
  // After mount we swap to the corporate design when light is selected.
  // Global chrome (header/footer) is provided by LayoutContent and is theme-aware,
  // so the corporate homepage renders embedded (without its own header/footer).
  if (mounted && theme === 'light') {
    return <CorporateLanding isDe={locale !== 'en'} embedded />;
  }
  return <HomeClient />;
}
