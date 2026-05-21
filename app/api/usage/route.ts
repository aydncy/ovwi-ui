import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  if (!supabaseServer) {
    return NextResponse.json({
      remaining: 0,
      error: "Supabase not configured"
    });
  }

  const { data } = await supabaseServer
    .from("usage")
    .select("*")
    .single();

  return NextResponse.json(data || { remaining: 0 });
}
