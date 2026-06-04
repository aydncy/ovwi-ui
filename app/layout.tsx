import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">
        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#081226] to-[#020617]">

          <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
            <div className="text-xl font-bold text-cyan-400">OVWI</div>

            <div className="flex gap-4 text-sm">
              <a href="/" className="hover:text-cyan-400">Home</a>
              <a href="/docs" className="hover:text-cyan-400">Docs</a>
              <a href="/dashboard" className="hover:text-cyan-400">Dashboard</a>
            </div>
          </nav>

          {children}
        </div>
      </body>
    </html>
  );
}
