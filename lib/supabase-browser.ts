'use client';

import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  if (typeof window === 'undefined') {
    // Server tarafında dummy client döndür (build sırasında hata vermesin)
    return {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => {},
        signInWithOAuth: async () => {},
        getUser: async () => ({ data: { user: null } })
      }
    };
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
};
