export const env = {
  SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",

  SUPABASE_ANON:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",

  LEMON_PRO:
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO || "",

  LEMON_ENTERPRISE:
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE || "",

  LEMON_SCALE:
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE || "",
};
