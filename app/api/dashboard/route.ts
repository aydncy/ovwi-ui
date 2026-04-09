import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PLAN_LIMITS: Record<string, number> = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ ok: false, error: "missing_email" });
  }

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    return NextResponse.json({
      ok: true,
      plan: "free",
      usage: 0,
      limit: 50,
      remaining: 50
    });
  }

  const limit = PLAN_LIMITS[data.plan] || 50;
  const usage = data.usage_count || 0;

  return NextResponse.json({
    ok: true,
    plan: data.plan,
    usage,
    limit,
    remaining: Math.max(limit - usage, 0)
  });
}
