'use client';

import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {

  async function handleLogout() {
    if (!supabase) return;

    // ✅ logout
    await supabase.auth.signOut();

    // ✅ CRITICAL: tüm cache temizle
    localStorage.clear();
    sessionStorage.clear();

    // ✅ CRITICAL: hard reload
    window.location.href = '/auth/login';
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur bg-white/5">
      
      <div className="font-bold text-lg">OVWI</div>

      <div className="flex gap-6 text-sm text-gray-300">
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/dashboard">Dashboard</a>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
