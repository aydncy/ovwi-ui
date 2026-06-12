'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Logout() {

  useEffect(() => {
    const run = async () => {
      try {

        // ✅ NULL GUARD
        if (!supabase) {
          window.location.href = '/auth/login';
          return;
        }

        // ✅ Supabase logout
        await supabase.auth.signOut();

        // ✅ local temizle
        localStorage.clear();

        // ✅ force redirect
        window.location.href = '/auth/login';

      } catch {
        window.location.href = '/auth/login';
      }
    };

    run();
  }, []);

  return <p className="p-6 text-gray-400">Logging out...</p>;
}
