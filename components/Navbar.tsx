'use client';

import { useEffect, useState } from 'react';
import { supabase as supabaseClient } from '@/lib/supabase-browser';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!supabaseClient) return;

    const sb = supabaseClient; // ✅ CRITICAL FIX

    async function load() {
      const { data } = await sb.auth.getUser();
      setUser(data.user);
    }

    load();

    const { data: listener } = sb.auth.onAuthStateChange(
      () => {
        window.location.reload(); // logout/login refresh
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    if (!supabaseClient) return;

    await supabaseClient.auth.signOut();
    window.location.replace('/auth/login');
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur bg-white/5">
      
      <div className="font-bold text-lg">OVWI</div>

      <div className="flex gap-6 text-sm text-gray-300">
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/dashboard">Dashboard</a>

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <a href="/auth/login">Login</a>
        )}
      </div>
    </nav>
  );
}
