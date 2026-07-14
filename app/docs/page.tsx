'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUser } from '@/lib/useUser';

export default function DocsPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* STICKY NAVBAR */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-black text-white">
              O
            </div>
            <span className="font-bold tracking-tight text-white">OVWI</span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/docs" className="text-sky-400 font-medium">
              Docs
            </Link>
            {user ? (
              <Link href="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/login" className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-slate-200 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT - TRUNCATED FOR EXAMPLE */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold tracking-tight">OVWI Docs</h1>
        <p className="mt-4 text-slate-400">Documentation content here...</p>
      </div>
    </div>
  );
}
