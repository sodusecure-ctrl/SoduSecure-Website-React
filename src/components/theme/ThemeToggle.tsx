'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
      title={isDark ? 'Zu Hell (Corporate) wechseln' : 'Zu Dunkel wechseln'}
      className={`group fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold shadow-xl backdrop-blur transition-all duration-300 hover:scale-105 active:scale-95 ${
        isDark
          ? 'border-[#FF3B30]/40 bg-[#1A1820]/95 text-white shadow-[0_8px_30px_-6px_rgba(255,59,48,0.5)] hover:border-[#FF3B30]/70'
          : 'border-[#DC2626]/30 bg-white/95 text-[#0B2A4A] shadow-[0_8px_30px_-6px_rgba(11,42,74,0.35)] hover:border-[#DC2626]/60'
      }`}
    >
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${isDark ? 'bg-[#FF3B30]/15 text-[#FF6B61]' : 'bg-[#DC2626]/10 text-[#DC2626]'}`}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
      <span className="hidden sm:inline">{isDark ? 'Hell' : 'Dunkel'}</span>
    </button>
  );
}

// Inline variant for placing the toggle inside a header (top-right).
export function ThemeToggleInline({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const cls =
    tone === 'dark'
      ? 'border-white/10 text-white/80 hover:border-[#FF3B30]/50 hover:text-white'
      : 'border-slate-300 text-[#0B2A4A] hover:border-[#DC2626]/60 hover:text-[#DC2626]';
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
      title={isDark ? 'Hell (Corporate)' : 'Dunkel'}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition ${cls}`}
    >
      {isDark ? <Sun className={`h-4 w-4 ${tone === 'dark' ? 'text-[#FF6B61]' : 'text-[#DC2626]'}`} /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
