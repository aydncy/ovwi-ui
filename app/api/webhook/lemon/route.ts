import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const secret = process.env.LEMON_WEBHOOK_SECRET;
  
  if (!secret) {
    return NextResponse.json({ error: 'Secret missing' }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get('x-signature');

  // İmza doğrulama (Basitleştirilmiş)
  // Gerçek projede HMAC kontrolü buraya gelir
  
  try {
    const payload = JSON.parse(rawBody);
    console.log('Lemon Webhook Received:', payload.event_name);
    
    // Burada plan yükseltme işlemleri yapılır
    
    return NextResponse.json({ received: true });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
