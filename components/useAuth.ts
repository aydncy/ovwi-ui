'use client';

import { useEffect, useState } from 'react';
import { supabase as supabaseClient } from '@/lib/supabase-browser';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseClient) {
      setLoading(false);
      return;
    }

    const sb = supabaseClient; // ✅ CRITICAL FIX

    async function getUser() {
      const { data } = await sb.auth.getUser();
      setUser(data.user);
      setLoading(false);
    }

    getUser();

    const { data: listener } = sb.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
