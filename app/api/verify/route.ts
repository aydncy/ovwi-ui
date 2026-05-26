import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || 'anonymous_user';
    
    // Redis anahtarı: user:email:usage
    const key = `usage:${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    // Sayacı artır (Yoksa 0'dan başlat)
    const newCount = await redis.incr(key);
    
    // Kullanıcının limitini belirle (Basit mantık: Free=50)
    // İleride burası DB'den plan bilgisine göre çekilebilir
    const limit = 50;
    const remaining = Math.max(0, limit - newCount);

    // Simüle edilmiş Webhook Doğrulama Sonucu
    const mockWebhookResult = {
      status: 'success',
      event: 'charge.succeeded',
      amount: 499,
      currency: 'EUR',
      verified_at: new Date().toISOString(),
      customer_email: email
    };

    return NextResponse.json({
      ok: true,
      usage: newCount,
      limit,
      remaining,
      webhook_simulation: mockWebhookResult
    });

  } catch (error) {
    console.error('Verify Error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: 'Verification failed',
      usage: 0,
      limit: 50,
      remaining: 50
    }, { status: 500 });
  }
}
