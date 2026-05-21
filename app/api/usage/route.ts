import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('usage')
    .select('used, remaining, limit')
    .eq('user_id', 'global')
    .single();

  if (error || !data) {
    // Kayıt yoksa oluştur
    await supabase.from('usage').upsert([{
      user_id: 'global',
      used: 0,
      limit: 50,
      remaining: 50
    }], { onConflict: 'user_id' });
    
    return NextResponse.json({ usage: 0, remaining: 50, limit: 50 });
  }

  return NextResponse.json({
    usage: data.used || 0,
    remaining: data.remaining || 50,
    limit: data.limit || 50
  });
}

export async function POST() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Atomic update (en güvenli yöntem)
  const { data, error } = await supabase
    .from('usage')
    .update({ 
      used: supabase.rpc('increment', { row_id: 'global' }), // Eğer rpc varsa
    })
    .eq('user_id', 'global')
    .select()
    .single();

  if (error) {
    console.error("Update Error:", error);
    // Fallback
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
  }

  return NextResponse.json({ ok: true });
}
