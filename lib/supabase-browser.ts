'use client';

import { createClient } from '@supabase/supabase-js';

let supabaseInstance: any = null;

export function createBrowserSupabase() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    if (typeof window !== 'undefined') {
      console.error('Missing Supabase ENV variables');
    }

    return {
      auth: {
        getUser: async () => ({ data: { user: null } }),
        signOut: async () => ({}),
        signInWithOtp: async () => ({
          error: {
            message: 'Supabase ENV missing'
          }
        })
      }
    };
  }

  supabaseInstance = createClient(url, anon);

  return supabaseInstance;
}
