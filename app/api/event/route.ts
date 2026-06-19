import { NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { endpoint, price } = body;

  const { data, error } = await sb
    .from("api_events")
    .insert([{ endpoint, price }]);

  return NextResponse.json({ success: true });
}
