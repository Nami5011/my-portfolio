'use client';
import { cn } from '@/lib/utils';
import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher({ className }: { className?: string }) {
  const { theme = 'light', setTheme } = useTheme();
  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-12.5 h-7"></div>;
  }

  return (
    <button
      className={cn(
        `theme-switcher-bg w-12.5 h-7 rounded-full p-px flex items-center border border-transparent ring-0 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] cursor-pointer
        transition-all duration-250 ease hover:brightness-95 dark:hover:brightness-150`,
        theme === 'light' ? 'justify-start' : 'justify-end',
        className,
      )}
      onClick={switchTheme}
      type="button"
    >
      <span
        className={cn(
          'theme-switcher-bg size-6 rounded-full flex items-center justify-center p-0.75 border border-transparent shadow-sm cursor-pointer',
        )}
        onClick={(e) => e.preventDefault()}
      >
        {theme === 'light' ? <SunDim className="size-full" /> : <Moon className="size-full" />}
      </span>
    </button>
  );
}
