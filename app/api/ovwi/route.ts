import { NextRequest, NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 401 });
    }

    const body = await req.json();
    const input = body.text || "";

    // ✅ USER CHECK
    const { data: user } = await sb
      .from("users_licenses")
      .select("*")
      .eq("api_key", apiKey)
      .single();

    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }

    if (user.monthly_usage >= user.monthly_limit) {
      return NextResponse.json(
        { error: "Limit reached. Upgrade required." },
        { status: 403 }
      );
    }

    // ✅ SIMPLE AI OPTIMIZER (REAL VALUE)
    const optimized = input
      .replace(/\bi\b/g, "we")
      .replace(/\bvery\b/g, "extremely")
      .replace(/\bgood\b/g, "high-quality")
      .replace(/\bbad\b/g, "low-quality");

    // ✅ USAGE UPDATE
    await sb
      .from("users_licenses")
      .update({
        monthly_usage: user.monthly_usage + 1,
        total_revenue: (user.total_revenue || 0) + 0.03,
      })
      .eq("user_id", user.user_id);

    await sb.from("usage_logs").insert({
      user_id: user.user_id,
    });

    await sb.from("api_calls").insert({
      user_id: user.user_id,
      endpoint: "ai_optimize",
      status: 200,
    });

    return NextResponse.json({
      success: true,
      original: input,
      optimized,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
