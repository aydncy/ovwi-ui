import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");

    let user = null;

    if (auth && auth.startsWith("Bearer ")) {
      const key = auth.replace("Bearer ", "");

      const { data } = await supabase
        .from("users_licenses")
        .select("*")
        .eq("api_key", key)
        .single();

      user = data;
    }

    const body = await req.json();
    const text = body.text || "";

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Improve this text for SEO and clarity"
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    const result = ai.choices[0].message.content;

    if (user) {
      await supabase
        .from("users_licenses")
        .update({
          monthly_usage: user.monthly_usage + 1
        })
        .eq("user_id", user.user_id);

      await supabase.from("api_calls").insert({
        user_id: user.user_id,
        endpoint: "ovwi",
        status: 200
      });
    }

    return NextResponse.json({
      success: true,
      result
    });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
