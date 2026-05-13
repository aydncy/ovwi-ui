import { NextResponse } from 'next/server';

const LIMITS: any = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const apiKey = body?.apiKey;
    const usage = Number(body?.usage || 0);
    const plan = body?.plan || 'free';

    if (!apiKey) {
      return NextResponse.json({
        ok: false,
        error: 'missing_api_key'
      }, { status: 400 });
    }

    const limit = LIMITS[plan] || 50;

    if (usage >= limit) {
      return NextResponse.json({
        ok: false,
        upgrade: true,
        error: 'limit_reached',
        usage,
        limit,
        remaining: 0,
        plan
      });
    }

    const nextUsage = usage + 1;

    return NextResponse.json({
      ok: true,
      verified: true,
      usage: nextUsage,
      limit,
      remaining: Math.max(limit - nextUsage, 0),
      upgrade: nextUsage >= limit,
      plan
    });

  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      error: e.message || 'server_error'
    }, { status: 500 });
  }
}
