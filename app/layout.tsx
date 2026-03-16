import type { Metadata } from 'next';
import './globals.css';
import { ThemeModeSync } from '@/components/theme/ThemeModeSync';
import { montserrat } from '@/config/fonts';

export const metadata: Metadata = {
  title: 'TAU Nova',
  description: 'TAU Nova'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${montserrat.className} antialiased`}>
        <ThemeModeSync />
        {children}
      </body>
    </html>
  );
}
