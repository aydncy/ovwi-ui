import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({
        ok: false,
        error: "env_missing"
      });
    }

    const { createClient } = await import("@supabase/supabase-js");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const apiKey =
      "ovwi_live_" + Math.random().toString(36).slice(2) + Date.now();

    const { data, error } = await supabase
      .from("api_keys")
      .insert({
        api_key: apiKey,
        plan: "free",
        usage_count: 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        ok: false,
        error: error.message
      });
    }

    return NextResponse.json({
      ok: true,
      apiKey: data.api_key,
      plan: data.plan,
      limit: 50
    });
  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      error: e?.message || "unknown"
    });
  }
}
