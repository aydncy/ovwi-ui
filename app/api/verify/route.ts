import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { key } = await req.json();

  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("key", key);

  if (!data || data.length === 0) {
    return NextResponse.json({ ok: false, error: "invalid_key" });
  }

  const row = data[0];

  return NextResponse.json({
    ok: true,
    plan: row.plan,
    usage: row.usage_count
  });
}
