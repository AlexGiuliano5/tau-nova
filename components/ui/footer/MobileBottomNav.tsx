'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiSearch, FiTool } from 'react-icons/fi';
import { IoReaderOutline } from 'react-icons/io5';

import { useUIstore } from '@/store/ui/ui-store';

export const MobileBottomNav = () => {
  const isSideMenuOpen = useUIstore(state => state.isSideMenuOpen);
  const pathname = usePathname();
  const isHomeActive = pathname === '/ftth';
  const isSearchActive = pathname.startsWith('/ftth/search');
  const isReportActive = pathname.startsWith('/ftth/report');

  return (
    <footer
      className={clsx(
        'fixed bottom-0 left-0 right-0 w-full h-[70px] flex justify-between items-center px-5 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] bg-(--footer-bg)',
        {
          'translate-y-full': isSideMenuOpen
        }
      )}
    >
      <Link
        href="/ftth"
        aria-current={isHomeActive ? 'page' : undefined}
        className="flex flex-col items-center text-(--footer-icon-text)"
      >
        <div className={clsx('p-2 rounded-full', { 'bg-(--footer-active-chip-bg)': isHomeActive })}>
          <FiHome size={32} />
        </div>
        {/* <span>Inicio</span> */}
      </Link>

      <Link
        href="/ftth/search"
        aria-current={isSearchActive ? 'page' : undefined}
        className="flex flex-col items-center text-(--footer-icon-text)"
      >
        <div
          className={clsx('p-2 rounded-full', { 'bg-(--footer-active-chip-bg)': isSearchActive })}
        >
          <FiSearch size={32} />
        </div>
        {/* <span>Búsqueda</span> */}
      </Link>

      <button
        type="button"
        aria-disabled="true"
        title="Próximamente"
        className="flex flex-col items-center text-(--footer-icon-text)"
      >
        <FiTool size={32} />
        {/* <span>Reportar</span> */}
      </button>

      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Próximamente"
        className="flex flex-col items-center text-(--footer-icon-text) opacity-50 cursor-not-allowed"
      >
        <div
          className={clsx('p-2 rounded-full', { 'bg-(--footer-active-chip-bg)': isReportActive })}
        >
          <IoReaderOutline size={32} />
        </div>
        {/* <span>Reportar</span> */}
      </button>
    </footer>
  );
};
