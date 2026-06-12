'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Logout() {

  useEffect(() => {
    const run = async () => {
      try {
        // ✅ Supabase logout
        await supabase.auth.signOut();

        // ✅ local storage temizle
        localStorage.clear();

        // ✅ cookie temizliği (fallback)
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // ✅ HARD redirect (çok önemli)
        window.location.href = '/auth/login';

      } catch (e) {
        window.location.href = '/';
      }
    };

    run();
  }, []);

  return <p className="p-6 text-gray-400">Logging out...</p>;
}
