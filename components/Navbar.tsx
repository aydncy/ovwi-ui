'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!supabase) return;

    async function load() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(
      () => {
        window.location.reload(); // ✅ CRITICAL FIX
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.replace('/auth/login'); // ✅ HARD REDIRECT
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
      <div className="font-bold text-lg">OVWI</div>

      <div className="flex gap-6 text-sm text-gray-300">
        //Home</a>
        //docsDocs</a>
        //dashboardDashboard</a>

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          /auth/loginLogin</a>
        )}
      </div>
    </nav>
  );
}
