import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const supabase = createServerClient();

  const { email } = await req.json();

  const { data: user, error } = await supabase
    .from('api_users')
    .select('*')
    .ilike('email', email)
    .single();

  if (!user) {
    return NextResponse.json({ error: 'NOT_FOUND' });
  }

  if (user.usage >= user.monthly_limit) {
    return NextResponse.json({ error: 'LIMIT_REACHED' });
  }

  const newUsage = user.usage + 1;

  await supabase
    .from('api_users')
    .update({ usage: newUsage })
    .eq('id', user.id);

  return NextResponse.json({
    usage: newUsage,
    limit: user.monthly_limit,
  });
}
