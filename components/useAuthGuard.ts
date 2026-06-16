'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace('/auth/login');
      }
    }

    check();
  }, []);
}
