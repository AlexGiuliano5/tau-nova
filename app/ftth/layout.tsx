import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FtthTopBar, MobileBottomNav, Sidebar } from '@/components';
import { isTokenExpired, parseUserTokenInfo } from '@/lib/auth/jwt';
import { getAuthTokenFromCookieStore } from '@/lib/auth/session';

export default async function FTTHLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = getAuthTokenFromCookieStore(cookieStore);

  if (!token || isTokenExpired(token)) {
    redirect('/login');
  }

  const userInfo = parseUserTokenInfo(token);

  return (
    <main className="h-dvh overflow-hidden transition-colors" style={{ backgroundColor: 'var(--app-bg)' }}>
      <FtthTopBar />

      <div className="h-full overflow-y-auto pt-[70px] pb-[80px]">
        <Sidebar userInfo={userInfo} />
        {children}
      </div>
      <MobileBottomNav />
    </main>
  );
}
