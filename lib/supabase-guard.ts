import { supabase } from './supabase-browser';

export function isSupabaseReady() {
  return supabase !== null;
}
