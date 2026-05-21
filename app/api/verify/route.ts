import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!supabaseServer) {
    return NextResponse.json({
      success: true,
      mode: "mock",
      data: body
    });
  }

  const { data } = await supabaseServer
    .from("verifications")
    .insert(body)
    .select();

  return NextResponse.json({
    success: true,
    data
  });
}
