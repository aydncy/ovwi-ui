import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();

  let { data: user } = await supabase
    .from('api_users')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    return NextResponse.json({ error: 'USER_NOT_FOUND' });
  }

  // 🚨 LIMIT
  if (user.usage >= user.limit) {
    return NextResponse.json({
      error: 'LIMIT_REACHED',
      usage: user.usage,
      limit: user.limit
    });
  }

  // ✅ usage artır
  const newUsage = user.usage + 1;

  await supabase
    .from('api_users')
    .update({ usage: newUsage })
    .eq('email', email);

  return NextResponse.json({
    success: true,
    usage: newUsage,
    limit: user.limit
  });
}
