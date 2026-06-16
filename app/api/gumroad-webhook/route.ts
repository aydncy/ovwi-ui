import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const email = (body.purchaser_email || '').trim().toLowerCase();
  const product = (body.product_name || '').toLowerCase();

  console.log("EMAIL:", email);
  console.log("PRODUCT:", product);

  // ✅ TÜM USERLARI ÇEK → NODE'DA BUL
  const { data: users, error } = await supabase
    .from('api_users')
    .select('*');

  if (error) {
    console.log("ERROR:", error);
    return NextResponse.json({ error: 'DB_ERROR' });
  }

  // ✅ JS İÇİNDE MATCH ET (100% GUARANTEED)
  const user = users.find(
    (u) => u.email?.trim().toLowerCase() === email
  );

  if (!user) {
    console.log("USER NOT FOUND AFTER MANUAL MATCH");
    return NextResponse.json({ error: 'USER_NOT_FOUND' });
  }

  let addLimit = 0;

  if (product.includes('pro')) addLimit = 2000;
  if (product.includes('scale')) addLimit = 10000;

  const remaining = user.monthly_limit - user.usage;
  const newLimit = remaining + addLimit;

  const { error: updateError } = await supabase
    .from('api_users')
    .update({ monthly_limit: newLimit })
    .eq('id', user.id); // ✅ ID ile update (EN GÜVENLİ)

  console.log("UPDATED TO:", newLimit);
  console.log("UPDATE ERROR:", updateError);

  return NextResponse.json({ success: true });
}
