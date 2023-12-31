'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/lib/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme, forcedTheme } = useTheme();
  const disabled = !!forcedTheme;
  
  return (
    disabled ? null :
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='overflow-hidden min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]'
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
