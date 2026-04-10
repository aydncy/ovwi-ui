import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { key } = body;

  if (!key) {
    return NextResponse.json({ ok: false, error: 'no_key' });
  }

  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', key)
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, error: 'invalid_key' });
  }

  const limitMap: any = {
    free: 50,
    pro: 1000,
    enterprise: 10000,
    scale: 100000
  };

  const limit = limitMap[data.plan] || 50;

  return NextResponse.json({
    ok: true,
    plan: data.plan,
    usage: data.usage_count,
    limit,
    remaining: limit - data.usage_count
  });
}
