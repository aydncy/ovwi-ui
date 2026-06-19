import { NextResponse } from "next/server";
import { sb } from "@/lib/supabase";
import { getLimit } from "@/lib/plan";

export async function POST(req) {

  const { apiKey } = await req.json();

  // key doğrula
  const { data: keyData } = await sb
    .from("api_keys")
    .select("*")
    .eq("api_key", apiKey)
    .single();

  if (!keyData) {
    return NextResponse.json({ error: "invalid key" });
  }

  const userId = keyData.user_id;

  // plan çek
  const { data: profile } = await sb
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();

  const plan = profile?.plan || "free";

  // kullanım say
  const { count } = await sb
    .from("api_events")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const limit = getLimit(plan);

  // LIMIT BLOCK 🔒
  if ((count || 0) >= limit) {
    return NextResponse.json({
      error: "limit reached",
      plan,
      limit
    });
  }

  // event yaz
  await sb.from("api_events").insert({
    user_id: userId,
    endpoint: "api-call",
    price: 0.03
  });

  return NextResponse.json({
    success: true,
    remaining: limit - (count || 0)
  });
}
