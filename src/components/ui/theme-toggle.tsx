'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center',
        'h-10 w-10 rounded-md',
        'border border-slate-200 bg-white text-slate-900',
        'hover:bg-slate-100 hover:text-slate-900',
        'dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
        'dark:hover:bg-slate-800 dark:hover:text-slate-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'transition-all duration-200 ease-in-out',
        'hover:scale-105 active:scale-95',
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
