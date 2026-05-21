'use client';
import { useEffect, useState } from 'react';
import { createSupabaseClient } from '@/lib/supabase-browser';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const supabase = createSupabaseClient();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <a href="/" className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          OVWI
        </a>

        <div className="flex items-center gap-4">
          <a href="/docs"><button className="px-6 py-2.5 rounded-2xl hover:bg-white/10 transition">Docs</button></a>
          
          {loggedIn ? (
            <>
              <a href="/dashboard"><button className="px-6 py-2.5 rounded-2xl hover:bg-white/10 transition">Dashboard</button></a>
              <button onClick={logout} className="primary-btn px-6 py-2.5 rounded-2xl">Logout</button>
            </>
          ) : (
            <a href="/auth/login">
              <button className="primary-btn px-8 py-2.5 rounded-2xl">Login</button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
