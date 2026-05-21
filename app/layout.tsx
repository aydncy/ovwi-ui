import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OVWI — AI Identity Infrastructure',
  description: 'Enterprise-grade AI verification platform',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#0a0c1a]">{children}</body>
    </html>
  );
}
