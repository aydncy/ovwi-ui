import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('usage')
      .select('used, remaining, limit')
      .eq('user_id', 'global')
      .maybeSingle();

    if (error) console.error("GET Error:", error);

    if (!data) {
      await supabase.from('usage').upsert([{
        user_id: 'global',
        used: 0,
        remaining: 50,
        limit: 50
      }], { onConflict: 'user_id' });

      return NextResponse.json({ usage: 0, remaining: 50, limit: 50 });
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

    // Mevcut kaydı al
    const { data: current } = await supabase
      .from('usage')
      .select('used')
      .eq('user_id', 'global')
      .maybeSingle();

    const newUsed = (current?.used || 0) + 1;
    const newRemaining = Math.max(0, 50 - newUsed);

    // Güncelle
    await supabase
      .from('usage')
      .upsert([{
        user_id: 'global',
        used: newUsed,
        remaining: newRemaining,
        limit: 50
      }], { onConflict: 'user_id' });

    return NextResponse.json({
      ok: true,
      usage: newUsed,
      remaining: newRemaining,
      limit: 50
    });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
