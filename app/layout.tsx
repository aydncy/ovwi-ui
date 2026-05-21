import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OVWI — AI Identity Infrastructure',
  description: 'Enterprise-grade AI verification platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
