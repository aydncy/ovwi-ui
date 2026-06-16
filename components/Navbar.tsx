'use client';

import { useAuth } from '@/components/useAuth';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    if (!supabase) return;

    await supabase.auth.signOut();

    // CRITICAL
    localStorage.clear();
    sessionStorage.clear();

    router.replace('/auth/login');
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">

      <div className="font-bold text-lg">OVWI</div>

      <div className="flex gap-6 text-sm text-gray-300">
        <a href="/">Home</a>
        <a href="/docs">Docs</a>

        {user && <a href="/dashboard">Dashboard</a>}

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <a href="/auth/login">Login</a>
        )}
      </div>

    </nav>
  );
}
