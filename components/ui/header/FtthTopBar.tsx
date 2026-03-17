import Image from 'next/image';
import { SideMenuToggleButton } from '@/components/ui/header/SideMenuToggleButton';

export const FtthTopBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center py-2 h-[70px] text-white bg-(--primary) dark:bg-(--secondary-2)">
      <div className="flex flex-col ml-4 -mt-3">
        <Image src="/imgs/Logo-personal-blanco.png" alt="logo" width={130} height={130} />
        <span className="-mt-3 ml-1 text-sm">Red FTTH</span>
      </div>
      <SideMenuToggleButton />
    </header>
  );
};
