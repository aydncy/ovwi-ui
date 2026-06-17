'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // ✅ GUARANTEED NON-NULL
    const sb = supabase;

    async function init() {
      const { data: { user } } = await sb.auth.getUser();
      setUser(user ?? null);
      setLoading(false);
    }

    init();

    const { data: listener } = sb.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
