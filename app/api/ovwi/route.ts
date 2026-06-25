import { NextRequest, NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 401 });
    }

    // ✅ USER BUL
    const { data: user, error } = await sb
      .from("users_licenses")
      .select("*")
      .eq("api_key", apiKey)
      .single();

    if (!user || error) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }

    // ✅ LIMIT CHECK
    if (user.monthly_usage >= user.monthly_limit) {
      return NextResponse.json(
        { error: "Limit reached. Upgrade required." },
        { status: 403 }
      );
    }

    // ✅ USAGE ARTIR
    await sb
      .from("users_licenses")
      .update({
        monthly_usage: user.monthly_usage + 1,
        total_revenue: user.total_revenue + 0.03,
      })
      .eq("user_id", user.user_id);

    // ✅ LOG
    await sb.from("api_calls").insert({
      user_id: user.user_id,
      endpoint: "ovwi_api",
      status: 200,
    });

    // ✅ RESPONSE (SENİN API SERVİSİN)
    return NextResponse.json({
      success: true,
      data: "REAL VALUE HERE",
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
