import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { email } = await req.json();

  const { data: user } = await supabase
    .from('api_users')
    .select('*')
    .ilike('email', email)
    .single();

  if (!user) {
    return NextResponse.json({ error: 'NOT_FOUND' });
  }

  return NextResponse.json({
    usage: user.usage,
    limit: user.monthly_limit,
    apiKey: user.api_key
  });
}
