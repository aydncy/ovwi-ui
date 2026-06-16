'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/auth/login';
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur bg-white/5">
      
      <div className="font-bold text-lg">OVWI</div>

      <div className="flex gap-6 text-sm text-gray-300">
        <a href="/">Home</a>
        <a href="/docs">Docs</a>
        <a href="/dashboard">Dashboard</a>

        {user ? (
          <button onClick={handleLogout} className="hover:text-white">
            Logout
          </button>
        ) : (
          <a href="/auth/login">Login</a>
        )}

      </div>
    </nav>
  );
}
