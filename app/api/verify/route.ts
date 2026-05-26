import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Redis Bağlantısı (Vercel Env Variables otomatik çekilir)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || 'default_user';
    
    // Kullanıcıya özel bir anahtar oluştur (email bazlı)
    const userKey = `usage:${email}`;
    
    // Redis'te sayacı 1 artır ve yeni değeri al
    // Eğer yoksa 0'dan başlatıp 1 yapar
    const currentUsage = await redis.incr(userKey);
    
    // Limiti belirle (Basitlik için sabit 50, ileride DB'den çekilebilir)
    const LIMIT = 50;
    const remaining = Math.max(0, LIMIT - currentUsage);
    const success = currentUsage <= LIMIT;

    return NextResponse.json({
      ok: success,
      message: success ? 'Verified Successfully' : 'Limit Exceeded',
      usage: currentUsage,
      limit: LIMIT,
      remaining: remaining,
      received: body
    });

  } catch (error) {
    console.error('Redis Error:', error);
    // Redis bağlantısı yoksa (local test için) fallback modu
    return NextResponse.json({
      ok: true,
      usage: 1,
      limit: 50,
      remaining: 49,
      note: "Redis connected failed, using mock mode"
    });
  }
}

// Dashboard'un sayacı çekmesi için GET metodu da ekleyelim
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || 'default_user';
  const userKey = `usage:${email}`;

  try {
    const val = await redis.get<number>(userKey);
    const currentUsage = val || 0;
    const LIMIT = 50;

    return NextResponse.json({
      usage: currentUsage,
      limit: LIMIT,
      remaining: Math.max(0, LIMIT - currentUsage)
    });
  } catch (e) {
    return NextResponse.json({ usage: 0, limit: 50, remaining: 50 });
  }
}
