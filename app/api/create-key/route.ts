import { NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

function generateKey() {
  return "sk_live_" + Math.random().toString(36).substring(2, 12);
}

export async function POST() {

  const { data } = await sb.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "unauthorized" });
  }

  const key = generateKey();

  await sb.from("api_keys").insert({
    user_id: data.user.id,
    api_key: key
  });

  return NextResponse.json({ apiKey: key });
}
