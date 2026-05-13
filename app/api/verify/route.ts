import { NextResponse } from 'next/server';
import crypto from 'crypto';

const usageStore = globalThis as any;

if (!usageStore.ovwi_usage_db) {
  usageStore.ovwi_usage_db = {};
}

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

    if (!apiKey) {
      return NextResponse.json({
        ok: false,
        error: 'missing_api_key'
      }, { status: 400 });
    }

    if (!usageStore.ovwi_usage_db[apiKey]) {
      usageStore.ovwi_usage_db[apiKey] = {
        usage: 0,
        plan: 'free',
        createdAt: Date.now()
      };
    }

    const user = usageStore.ovwi_usage_db[apiKey];

    const limit = LIMITS[user.plan] || 50;

    if (user.usage >= limit) {
      return NextResponse.json({
        ok: false,
        upgrade: true,
        error: 'limit_reached',
        usage: user.usage,
        limit,
        remaining: 0,
        plan: user.plan
      });
    }

    user.usage += 1;

    const remaining = Math.max(limit - user.usage, 0);

    return NextResponse.json({
      ok: true,
      verified: true,
      id: crypto.randomUUID(),
      usage: user.usage,
      limit,
      remaining,
      plan: user.plan,
      upgrade: remaining <= 0
    });

  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      error: e.message || 'server_error'
    }, { status: 500 });
  }
}
