import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SECRET = process.env.LEMON_WEBHOOK_SECRET!;

function verifySignature(rawBody: string, signature: string) {
  const hmac = crypto.createHmac('sha256', SECRET);
  const digest = hmac.update(rawBody).digest('hex');
  return digest === signature;
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature') || '';

  // if (!verifySignature(rawBody, signature)) {
    // return NextResponse.json({ ok: false, error: 'invalid_signature' });
  }

  const body = JSON.parse(rawBody);

  if (body.meta.event_name === 'order_created') {
    const email = body.data.attributes.user_email;
    const product = body.data.attributes.product_name;

    let plan = 'free';
    if (product.toLowerCase().includes('pro')) plan = 'pro';
    if (product.toLowerCase().includes('enterprise')) plan = 'enterprise';
    if (product.toLowerCase().includes('scale')) plan = 'scale';

    const key = 'ovwi_live_' + Math.random().toString(36).substring(2, 12);

    await supabase.from('api_keys').insert({
      key,
      plan,
      usage_count: 0
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
