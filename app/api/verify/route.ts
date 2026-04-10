import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const PLAN_LIMITS = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
};

export async function POST(req) {
  const body = await req.json();
  const key = body.key;

  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("key", key);

  if (!data || data.length === 0) {
    return NextResponse.json({ ok: false, error: "invalid_key" });
  }

  const row = data[0];
  const limit = PLAN_LIMITS[row.plan] || 50;

  if (row.usage_count >= limit) {
    return NextResponse.json({
      ok: false,
      error: "limit_reached",
      upgrade_url: "https://cyzora.lemonsqueezy.com"
    });
  }

  await supabase
    .from("api_keys")
    .update({ usage_count: row.usage_count + 1 })
    .eq("key", key);

  return NextResponse.json({
    ok: true,
    plan: row.plan,
    usage: row.usage_count + 1,
    remaining: limit - (row.usage_count + 1)
  });
}
