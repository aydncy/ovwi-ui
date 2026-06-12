'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Logout() {
  useEffect(() => {
    const run = async () => {
      await supabase?.auth.signOut();

      // ✅ tamamen state reset
      window.location.replace('/');
    };

    run();
  }, []);

  return <p className="p-6 text-gray-400">Logging out...</p>;
}
