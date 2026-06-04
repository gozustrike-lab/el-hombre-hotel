'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <button
        className="relative w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md bg-white/10 dark:bg-white/10 border border-white/20 transition-all duration-300"
        aria-label="Cambiar tema"
      >
        <span className="sr-only">Cambiar tema</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110',
        'bg-white/10 dark:bg-white/10'
      )}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <Sun
        className={cn(
          'absolute h-4 w-4 transition-all duration-500',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-amber-600'
        )}
      />
      <Moon
        className={cn(
          'absolute h-4 w-4 transition-all duration-500',
          isDark ? 'rotate-0 scale-100 opacity-100 text-white' : '-rotate-90 scale-0 opacity-0'
        )}
      />
    </button>
  );
}
