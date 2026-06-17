'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sb = supabase;

    async function load() {
      const { data: { user } } = await sb.auth.getUser();
      setUser(user);
    }

    load();

    const { data: listener } = sb.auth.onAuthStateChange(
      (_event, session) => {
        console.log("SESSION:", session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    // ✅ HARD REFRESH (CRITICAL)
    window.location.href = '/auth/login';
  }

  return (
    <nav className="flex justify-between px-8 py-4 border-b border-white/10 bg-black text-white">

      <Link href="/">OVWI</Link>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>

        {user && <Link href="/dashboard">Dashboard</Link>}

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </div>

    </nav>
  );
}
