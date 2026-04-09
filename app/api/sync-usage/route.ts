import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getRedis } from "../../lib/upstash";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const apiKey = body?.apiKey;

  if (!apiKey) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const redis = getRedis();
  const usage = await redis.get(`ovwi:key:${apiKey}:usage`);

  return NextResponse.json({ ok: true, usage });
}
