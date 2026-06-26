import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const apiKey = authHeader.substring(7);

      const { data } = await supabase
        .from('users_licenses')
        .select('*')
        .eq('api_key', apiKey)
        .single();

      user = data;
    }

    const body = await request.json();
    const text = body.text;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Rewrite this content for SEO, clarity and engagement."
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    const output = completion.choices?.[0]?.message?.content || "";  // ✅ FIX

    return NextResponse.json({
      success: true,
      data: {
        optimized_text: output
      }
    });

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
