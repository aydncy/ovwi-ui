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

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text field is required' },
        { status: 400 }
      );
    }

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

    // ✅ FIX: null-safe output
    const output = completion.choices?.[0]?.message?.content || "";

    if (user) {
      await supabase
        .from('users_licenses')
        .update({
          monthly_usage: user.monthly_usage + 1,
          total_revenue: (user.total_revenue || 0) + 0.05,
        })
        .eq('user_id', user.user_id);

      await supabase
        .from('api_calls')
        .insert({
          user_id: user.user_id,
          endpoint: 'POST /api/ovwi',
          status: 200,
        });
    }

    return NextResponse.json({
      success: true,
      data: {
        status: 'completed',
        original_length: text.length,
        optimized_length: output.length,
        optimized_text: output
      }
    });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
