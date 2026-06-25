import { NextRequest, NextResponse } from "next/server";
import { sb } from "@/lib/supabase";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    // ✅ CLIENT BURADA OLUŞTURULUR (FIX)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const apiKey = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 401 });
    }

    const body = await req.json();
    const input = body.text || "";

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

    // ✅ AI CALL
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You improve text for SEO and clarity.",
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const output = completion.choices[0].message.content;

    await sb
      .from("users_licenses")
      .update({
        monthly_usage: user.monthly_usage + 1,
        total_revenue: (user.total_revenue || 0) + 0.05,
      })
      .eq("user_id", user.user_id);

    await sb.from("usage_logs").insert({
      user_id: user.user_id,
    });

    return NextResponse.json({
      success: true,
      result: output,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
