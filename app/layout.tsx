import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        <div className="min-h-screen relative overflow-hidden">

          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#081226] to-[#020617]" />

          {/* glow */}
          <div className="absolute top-[-200px] left-1/2 w-[800px] h-[800px] bg-cyan-500/30 blur-[140px] -translate-x-1/2" />

          {/* navbar */}
          <nav className="relative z-10 flex justify-between items-center px-8 py-4 border-b border-white/10">
            <div className="text-xl font-bold text-cyan-400">OVWI</div>

            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-cyan-400">Home</Link>
              <Link href="/docs" className="hover:text-cyan-400">Docs</Link>
              <Link href="/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            </div>
          </nav>

          {/* content */}
          <div className="relative z-10">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
