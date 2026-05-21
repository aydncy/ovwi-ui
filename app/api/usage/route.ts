import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({
      remaining: 0,
      used: 0,
      status: "mock-mode"
    });
  }

  const { data } = await supabaseServer
    .from("usage")
    .select("*")
    .single();

  return NextResponse.json(data || { remaining: 0 });
}
