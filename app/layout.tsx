import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OVWI | AI Infrastructure',
  description: 'Build. Scale. Monetize.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
