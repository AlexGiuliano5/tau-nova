import { FtthTopBar, MobileBottomNav, Sidebar } from '@/components';

export default function FTTHLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-dvh overflow-hidden transition-colors" style={{ backgroundColor: 'var(--app-bg)' }}>
      <FtthTopBar />

      <div className="h-full overflow-y-auto pt-[70px] pb-[80px]">
        <Sidebar />
        {children}
      </div>
      <MobileBottomNav />
    </main>
  );
}
