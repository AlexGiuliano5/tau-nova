'use client';

import { useEffect } from 'react';

import { useUIstore } from '@/store/ui/ui-store';

const DARK_THEME_CLASS = 'dm';

export const ThemeModeSync = () => {
  const isDarkMode = useUIstore(state => state.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle(DARK_THEME_CLASS, isDarkMode);
  }, [isDarkMode]);

  return null;
};
