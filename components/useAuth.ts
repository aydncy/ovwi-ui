'use client';

import { useEffect, useState } from 'react';
import { supabase as sb } from '@/lib/supabase-browser';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sb) return;

    async function init() {
      const { data } = await sb.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    }

    init();

    const { data: listener } = sb.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
