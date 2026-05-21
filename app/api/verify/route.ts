import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  if (!supabaseServer) {
    return NextResponse.json({
      success: false,
      error: "Supabase not configured"
    });
  }

  const body = await req.json();

  const { data } = await supabaseServer
    .from("verifications")
    .insert(body)
    .select();

  return NextResponse.json({
    success: true,
    data
  });
}
