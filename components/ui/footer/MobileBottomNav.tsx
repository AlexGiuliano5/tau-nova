'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiSearch, FiTool } from 'react-icons/fi';
import { IoReaderOutline } from 'react-icons/io5';
import { useShallow } from 'zustand/react/shallow';

import { useUIstore } from '@/store/ui/ui-store';

export const MobileBottomNav = () => {
  const { isSideMenuOpen } = useUIstore(useShallow(state => ({ isSideMenuOpen: state.isSideMenuOpen })));
  const pathname = usePathname();
  const isHomeActive = pathname === '/ftth';
  const isSearchActive = pathname.startsWith('/ftth/busqueda');
  const isReportActive = pathname.startsWith('/ftth/report');

  return (
    <footer
      className={clsx(
        'fixed bottom-0 left-0 right-0 w-full h-[70px] flex justify-between items-center px-5 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] dark:bg-(--secondary-2) bg-white',
        {
          'translate-y-full': isSideMenuOpen
        }
      )}
    >
      <Link
        href="/ftth"
        aria-current={isHomeActive ? 'page' : undefined}
        className="flex flex-col items-center text-(--primary-2) dark:text-white"
      >
        <div
          className={clsx('p-2 rounded-full', {
            'bg-(--primary-2)/20 dark:bg-white/20': isHomeActive
          })}
        >
          <FiHome size={32} />
        </div>
      </Link>

      <Link
        href="/ftth/busqueda"
        aria-current={isSearchActive ? 'page' : undefined}
        className="flex flex-col items-center text-(--primary-2) dark:text-white"
      >
        <div
          className={clsx('p-2 rounded-full', {
            'bg-(--primary-2)/20 dark:bg-white/20': isSearchActive
          })}
        >
          <FiSearch size={32} />
        </div>
      </Link>

      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Próximamente"
        className="flex flex-col items-center text-(--primary-2) dark:text-white opacity-50 cursor-not-allowed"
      >
        <FiTool size={32} />
      </button>

      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Próximamente"
        className="flex flex-col items-center text-(--primary-2) dark:text-white opacity-50 cursor-not-allowed"
      >
        <div
          className={clsx('p-2 rounded-full', {
            'bg-(--primary-2)/20 dark:bg-white/20': isReportActive
          })}
        >
          <IoReaderOutline size={32} />
        </div>
      </button>
    </footer>
  );
};
