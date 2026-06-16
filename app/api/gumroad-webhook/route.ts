import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const email = body.purchaser_email;
  const product = (body.product_name || '').toLowerCase();

  let limit = 50;

  if (product.includes('pro')) {
    limit = 2000;
  }

  if (product.includes('scale')) {
    limit = 10000;
  }

  await supabase
    .from('api_users')
    .update({ monthly_limit: limit })
    .eq('email', email);

  return NextResponse.json({ success: true });
}
