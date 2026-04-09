'use client';

import { useEffect } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';
import { saveSession } from '@/lib/session';

export default function Callback() {
  const supabase = createBrowserSupabase();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (user?.email) {
        saveSession({ email: user.email });

        // API key yoksa oluştur
        const existing = localStorage.getItem('ovwi_api_key');
        if (!existing) {
          const res = await fetch('/api/create-key', { method: 'POST' });
          const d = await res.json();
          if (d.ok) localStorage.setItem('ovwi_api_key', d.apiKey);
        }

        window.location.href = '/dashboard';
      } else {
        window.location.href = '/auth/login';
      }
    };

    run();
  }, []);

  return null;
}
