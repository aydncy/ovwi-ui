import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { key } = await req.json();

  if (!key) {
    return NextResponse.json({ ok: false, error: 'no_key' });
  }

  const { data } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', key)
    .single();

  if (!data) {
    return NextResponse.json({ ok: false, error: 'invalid_key' });
  }

  return NextResponse.json({
    ok: true,
    plan: data.plan,
    usage: data.usage_count
  });
}
