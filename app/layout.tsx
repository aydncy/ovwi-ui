import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OVWI',
  description: 'SaaS Platform'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#060816] text-white">
        {children}
      </body>
    </html>
  );
}
