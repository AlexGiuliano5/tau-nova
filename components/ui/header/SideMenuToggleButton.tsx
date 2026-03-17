'use client';

import { IoClose, IoPersonCircleOutline } from 'react-icons/io5';
import { useShallow } from 'zustand/react/shallow';

import { useUIstore } from '@/store/ui/ui-store';

export const SideMenuToggleButton = () => {
  const { isSideMenuOpen, openSideMenu, closeSideMenu } = useUIstore(
    useShallow(state => ({
      isSideMenuOpen: state.isSideMenuOpen,
      openSideMenu: state.openSideMenu,
      closeSideMenu: state.closeSideMenu
    }))
  );

  return isSideMenuOpen ? (
    <button
      type="button"
      className="w-6/12 flex justify-end items-center mr-5"
      onClick={closeSideMenu}
      aria-label="Cerrar menú lateral"
    >
      <IoClose size={32} />
    </button>
  ) : (
    <button
      type="button"
      className="w-6/12 flex justify-end items-center mr-5"
      onClick={openSideMenu}
      aria-label="Abrir menú lateral"
    >
      <IoPersonCircleOutline size={32} />
    </button>
  );
};
