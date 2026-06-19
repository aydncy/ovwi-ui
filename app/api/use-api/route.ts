import { NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

export async function POST(req: Request) {
  const { apiKey } = await req.json();

  const { data } = await sb
    .from("api_keys")
    .select("*")
    .eq("api_key", apiKey)
    .single();

  if (!data) {
    return NextResponse.json({ error: "invalid key" });
  }

  // LOG EVENT
  await sb.from("api_events").insert({
    user_id: data.user_id,
    endpoint: "demo-call",
    price: 0.03
  });

  return NextResponse.json({ success: true });
}
