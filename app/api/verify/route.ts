import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Redis Client (Env değişkenleri Vercel'de tanımlı)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || 'anonymous_user';
    
    // Kullanıcı bazlı sayaç anahtarı
    const key = `usage:${email}`;
    
    // Sayacı artır (Atomic increment)
    const newCount = await redis.incr(key);
    
    // Limit kontrolü (Şimdilik sabit 50, ileride plan bazlı olabilir)
    const LIMIT = 50;
    const remaining = Math.max(0, LIMIT - newCount);
    const success = newCount <= LIMIT;

    return NextResponse.json({
      ok: success,
      message: success ? "Verified Successfully" : "Limit Exceeded",
      usage: newCount,
      limit: LIMIT,
      remaining: remaining,
      email: email
    });

  } catch (error) {
    console.error("Verify Error:", error);
    // Hata durumunda bile uygulamanın çökmemesi için fallback
    return NextResponse.json({
      ok: false,
      error: "Verification service unavailable",
      usage: 0,
      limit: 50,
      remaining: 50
    }, { status: 503 });
  }
}
