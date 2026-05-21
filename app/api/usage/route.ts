import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    let { data, error } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', 'global')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase Error:', error);
    }

    if (!data) {
      await supabase.from('usage').insert([{
        user_id: 'global',
        used: 0,
        limit: 50,
        remaining: 50
      }]);
      data = { used: 0, remaining: 50, limit: 50 };
    }

    return NextResponse.json({
      usage: data.used || 0,
      remaining: data.remaining || 50,
      limit: data.limit || 50
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ usage: 0, remaining: 50, limit: 50 });
  }
}

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: current } = await supabase
      .from('usage')
      .select('used')
      .eq('user_id', 'global')
      .single();

    const newUsed = (current?.used || 0) + 1;
    const newRemaining = Math.max(0, 50 - newUsed);

    await supabase
      .from('usage')
      .update({ used: newUsed, remaining: newRemaining })
      .eq('user_id', 'global');

    return NextResponse.json({
      ok: true,
      usage: newUsed,
      remaining: newRemaining,
      limit: 50
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
