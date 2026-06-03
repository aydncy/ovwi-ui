import { supabase } from './supabase-browser';

export const safeSupabase = {
  auth: {
    getSession: async () => {
      if (!supabase) return { data: { session: null } };
      return supabase.auth.getSession();
    },

    onAuthStateChange: (cb: any) => {
      if (!supabase) {
        return { data: { subscription: null } };
      }
      return supabase.auth.onAuthStateChange(cb);
    },

    signInWithOAuth: async (args: any) => {
      if (!supabase) {
        console.error('Supabase not configured');
        return;
      }
      return supabase.auth.signInWithOAuth(args);
    },

    signOut: async () => {
      if (!supabase) return;
      return supabase.auth.signOut();
    }
  }
};
