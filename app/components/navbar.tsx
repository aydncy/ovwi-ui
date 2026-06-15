'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="w-full border-b border-gray-800 bg-[#020617] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="font-bold text-white">OVWI</h1>

        <div className="flex gap-6 text-sm text-gray-300">
          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/auth/login">Login</Link>
        </div>

      </div>
    </div>
  );
}
