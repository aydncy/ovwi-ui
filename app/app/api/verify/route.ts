import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getRedis } from "../../lib/upstash";

export const runtime = "nodejs";

const LIMITS: any = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const apiKey = body?.apiKey;

    if (!apiKey) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const redis = getRedis();

    let usage: any = await redis.get(`ovwi:${apiKey}`);
    if (!usage) usage = 0;

    usage++;
    await redis.set(`ovwi:${apiKey}`, usage);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: keyData } = await supabase
      .from("api_keys")
      .select("email")
      .eq("api_key", apiKey)
      .single();

    const email = keyData?.email;

    const { data: user } = await supabase
      .from("users")
      .select("plan")
      .eq("email", email)
      .single();

    const plan = user?.plan || "free";
    const limit = LIMITS[plan] || 50;

    if (usage > limit) {
      return NextResponse.json({
        ok: false,
        error: "limit_reached",
        usage,
        limit,
        remaining: 0,
        upgrade: true,
        checkout: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
      });
    }

    return NextResponse.json({
      ok: true,
      usage,
      limit,
      remaining: limit - usage,
      plan
    });

  } catch (e) {
    return NextResponse.json({ ok: false, error: "server_error" });
  }
}
