import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.json();

  const email = (body.purchaser_email || '').trim().toLowerCase();
  const product = (body.product_name || '').toLowerCase();

  let addLimit = 0;

  if (product.includes('pro')) addLimit = 2000;
  if (product.includes('scale')) addLimit = 10000;

  // ✅ user al
  const { data: user } = await supabase
    .from('api_users')
    .select('*')
    .ilike('email', email)
    .single();

  if (!user) {
    return NextResponse.json({ error: 'USER_NOT_FOUND' });
  }

  const remaining = user.monthly_limit - user.usage;
  const newLimit = remaining + addLimit;

  await supabase
    .from('api_users')
    .update({ monthly_limit: newLimit })
    .eq('id', user.id);

  return NextResponse.json({ success: true });
}
