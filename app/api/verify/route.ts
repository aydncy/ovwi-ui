import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PLAN_LIMITS: any = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
};

export async function POST(req: Request) {
  const { apiKey } = await req.json();

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('api_key', apiKey)
    .single();

  if (!user) {
    return NextResponse.json({ ok: false, error: 'invalid_key' });
  }

  const limit = PLAN_LIMITS[user.plan] || 50;

  if (user.usage_count >= limit) {
    return NextResponse.json({
      ok: true,
      upgrade: true,
      plan: user.plan,
      usage: user.usage_count,
      limit
    });
  }

  const usage = user.usage_count + 1;

  await supabase
    .from('users')
    .update({ usage_count: usage })
    .eq('api_key', apiKey);

  return NextResponse.json({
    ok: true,
    plan: user.plan,
    usage,
    limit,
    remaining: limit - usage
  });
}
