import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.warn("Supabase server env missing (build safe mode)");
}

export const supabaseServer =
  supabaseUrl && serviceKey
    ? createClient(supabaseUrl, serviceKey)
    : null;
