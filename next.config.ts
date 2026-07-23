import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mock.mock",

    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-key",

    NEXT_PUBLIC_LEMON_CHECKOUT_PRO:
      process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO || "#",

    NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE:
      process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE || "#",

    NEXT_PUBLIC_LEMON_CHECKOUT_SCALE:
      process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE || "#",
  },
};

export default nextConfig;