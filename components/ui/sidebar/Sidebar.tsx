'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

import {
  IoChevronForward,
  IoLogOutOutline,
  IoMoonOutline,
  IoNotificationsOutline,
  IoSettingsOutline
} from 'react-icons/io5';
import { useShallow } from 'zustand/react/shallow';

import { logoutAction } from '@/actions/auth/login.action';
import { useUIstore } from '@/store/ui/ui-store';

interface SidebarProps {
  userInfo?: {
    fullname?: string;
    legajo?: string;
    roles?: string[];
  };
}

function getInitials(fullname?: string): string {
  if (!fullname) {
    return 'US';
  }

  const parts = fullname.split(' ').filter(Boolean);

  // Si hay 3+ palabras, usar inicial del primer nombre y primer apellido.
  if (parts.length >= 3) {
    return `${parts[0][0]?.toUpperCase() ?? ''}${parts[2][0]?.toUpperCase() ?? ''}`;
  }

  if (parts.length === 2) {
    return `${parts[0][0]?.toUpperCase() ?? ''}${parts[1][0]?.toUpperCase() ?? ''}`;
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return 'US';
}

export const Sidebar = ({ userInfo }: SidebarProps) => {
  const { isSideMenuOpen, closeSideMenu, isDarkMode, toggleDarkMode } = useUIstore(
    useShallow(state => ({
      isSideMenuOpen: state.isSideMenuOpen,
      closeSideMenu: state.closeSideMenu,
      isDarkMode: state.isDarkMode,
      toggleDarkMode: state.toggleDarkMode
    }))
  );
  useEffect(() => {
    document.body.style.overflow = isSideMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  return (
    <div
      className={clsx(
        'fixed inset-x-0 bottom-0 top-[70px] z-40 transition-opacity duration-300',
        isSideMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <button
        type="button"
        aria-label="Cerrar menú"
        className="absolute inset-0 bg-black/20"
        onClick={closeSideMenu}
      />

      <nav
        className={clsx(
          'absolute inset-y-0 right-0 h-full w-full bg-(--primary-2) dark:bg-(--secondary-3) transform transition-transform duration-300 flex flex-col overflow-y-auto',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )}
      >
        <div className="flex flex-col items-center text-white pt-10">
          <h1 className="text-3xl font-semibold rounded-full bg-white/20 border border-white/40 w-25 h-25 flex items-center justify-center shadow-lg">
            {getInitials(userInfo?.fullname)}
          </h1>
          <div className="flex flex-col items-center mt-5 gap-1">
            <h2 className="text-lg font-semibold">{userInfo?.fullname ?? 'Usuario'}</h2>
            <span className="text-sm text-white/60">{userInfo?.legajo ?? 'Sin legajo'}</span>
          </div>
        </div>

        <div className="w-full bg-(--card) mt-10 rounded-t-3xl p-4 flex-1 flex flex-col min-h-0 overflow-y-auto">
          <span className="text-sm font-semibold text-(--text-secondary) opacity-50">Ajustes</span>
          <div className="flex flex-col h-full w-full my-4 min-h-max">
            <div className="flex flex-col gap-5">
              <button type="button" className="flex items-center gap-2 w-full h-[80px]">
                <div className="flex gap-2 items-center w-11/12">
                  <IoSettingsOutline size={24} className="text-(--primary)" />
                  <span className="text-lg font-semibold">Preferencias</span>
                </div>
                <div className="flex items-center justify-end w-1/12">
                  <IoChevronForward size={24} />
                </div>
              </button>

              <button type="button" className="flex items-center gap-2 w-full h-[80px]">
                <div className="flex gap-2 items-center w-11/12">
                  <IoNotificationsOutline size={24} className="text-orange-400" />
                  <span className="text-lg font-semibold">Notificaciones</span>
                </div>
                <div className="flex items-center justify-end w-1/12">
                  <IoChevronForward size={24} />
                </div>
              </button>

              <div className="flex items-center gap-2 w-full h-[80px]">
                <div className="flex gap-2 items-center w-9/12">
                  <IoMoonOutline size={24} className="text-violet-600" />
                  <span className="text-lg font-semibold">Modo oscuro</span>
                </div>
                <div className="flex items-center justify-end w-3/12">
                  <button
                    type="button"
                    aria-label="Activar o desactivar modo oscuro"
                    aria-pressed={isDarkMode}
                    onClick={toggleDarkMode}
                    className={
                      'relative inline-flex h-7 w-13 items-center rounded-full transition-colors bg-(--primary)/50 dark:bg-(--secondary)/20'
                    }
                  >
                    <span
                      className={clsx(
                        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                        isDarkMode ? 'translate-x-8' : 'translate-x-1'
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 sticky bottom-0 bg-(--sidebar-panel-bg)">
              <form
                action={logoutAction}
                onSubmit={() => {
                  closeSideMenu();
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 w-full h-[60px] shadow-sm rounded-lg bg-red-500/5"
                >
                  <div className="flex gap-2 items-center justify-center w-full ">
                    <IoLogOutOutline size={24} className="text-red-500" />
                    <span className="text-lg font-semibold text-red-500">Cerrar sesión</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
