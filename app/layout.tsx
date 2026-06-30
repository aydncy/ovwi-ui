import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OVWI — Open Verifiable Workflow Infrastructure',
  description:
    'Run, verify, and audit every execution across your systems. OVWI is developer-focused infrastructure for verifiable, auditable, and traceable workflows.',
  metadataBase: new URL('https://ovwi.cyzora.com'),
  openGraph: {
    title: 'OVWI — Open Verifiable Workflow Infrastructure',
    description:
      'Run, verify, and audit every execution across your systems.',
    url: 'https://ovwi.cyzora.com',
    siteName: 'OVWI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVWI — Open Verifiable Workflow Infrastructure',
    description: 'Run, verify, and audit every execution across your systems.',
  },
};

export const viewport: Viewport = {
  themeColor: '#050816',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body>
        <div className="bg-ambient" aria-hidden="true" />
        <div className="bg-grid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
