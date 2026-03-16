import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;
  isDarkMode: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;
  toggleDarkMode: () => void;
}

export const useUIstore = create<State>(set => ({
  isSideMenuOpen: false,
  isDarkMode: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode }))
}));
