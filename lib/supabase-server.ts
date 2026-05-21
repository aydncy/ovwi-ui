import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// ❗ BUILD SAFE MODE (IMPORTANT)
export const supabaseServer =
  supabaseUrl && serviceKey
    ? createClient(supabaseUrl, serviceKey)
    : null;
