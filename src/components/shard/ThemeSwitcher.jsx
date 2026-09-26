/* eslint-disable react-hooks/set-state-in-effect */
// components/ThemeSwitcher.js
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { Sun, Moon } from 'lucide-react'; // নিশ্চিত হয়ে নিও lucide-react ইনস্টল করা আছে

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration mismatch এড়াতে মাউন্ট হওয়ার আগে একটি পজিশন হোল্ডার বাটন দেখানো হচ্ছে
  if (!mounted) {
    return (
      <Button isIconOnly variant="light" radius="full" size="sm" className="opacity-0">
        <span className="h-5 w-5" />
      </Button>
    );
  }

  const isLight = theme === 'light';

  return (
    <Button
      isIconOnly
      variant="light"
      radius="full"
      size="sm"
      aria-label="Toggle theme"
      className="text-foreground/70 hover:text-orange-500 hover:bg-default-100 transition-colors"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      {isLight ? (
        <Sun className="h-5 w-5 transition-transform duration-300 scale-100 text-amber-500" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 scale-100 text-indigo-500" />
      )}
    </Button>
  );
}