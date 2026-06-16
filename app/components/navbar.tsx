'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="w-full border-b border-gray-800 bg-[#020617] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="font-bold text-white">OVWI</h1>

        <div className="flex gap-6 text-sm text-gray-300">

          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>

          {user && <Link href="/dashboard">Dashboard</Link>}

          {user ? (
            <Link href="/auth/logout">Logout</Link>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}

        </div>

      </div>
    </div>
  );
}
