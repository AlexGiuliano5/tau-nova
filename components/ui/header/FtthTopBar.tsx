'use client';

import Image from 'next/image';
import { IoClose, IoPersonCircleOutline } from 'react-icons/io5';

import { useUIstore } from '@/store/ui/ui-store';

export const FtthTopBar = () => {
  const openSideMenu = useUIstore(state => state.openSideMenu);
  const isSideMenuOpen = useUIstore(state => state.isSideMenuOpen);
  const closeSideMenu = useUIstore(state => state.closeSideMenu);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center py-2 h-[70px] text-white bg-(--topbar-bg)">
      <div className="flex flex-col ml-4 -mt-3">
        <Image src="/imgs/Logo-personal-blanco.png" alt="logo" width={130} height={130} />
        <span className="-mt-3 ml-1 text-sm">Red FTTH</span>
      </div>

      {isSideMenuOpen ? (
        <button
          type="button"
          className="w-6/12 flex justify-end items-center mr-5"
          onClick={closeSideMenu}
        >
          <IoClose size={32} />
        </button>
      ) : (
        <button
          type="button"
          className="w-6/12 flex justify-end items-center mr-5"
          onClick={openSideMenu}
        >
          <IoPersonCircleOutline size={32} />
        </button>
      )}
    </header>
  );
};
