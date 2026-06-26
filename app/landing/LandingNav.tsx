'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled ? 'glass glow-primary' : 'border border-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-black text-white shadow-lg shadow-blue-500/30">
            O
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">OVWI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:text-foreground sm:block"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:shadow-blue-500/50"
          >
            Start Building
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-foreground"
    >
      {children}
    </Link>
  );
}
