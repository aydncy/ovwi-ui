import { NextResponse } from 'next/server';
import { PLANS } from '@/lib/plans';

let usageMap: Record<string, number> = {};

export async function POST(req: Request) {
  const body = await req.json();

  const apiKey = body.apiKey;
  const plan = body.plan || 'free';

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      error: 'Missing apiKey'
    });
  }

  const limit =
    PLANS[plan as keyof typeof PLANS]?.limit || 50;

  usageMap[apiKey] = (usageMap[apiKey] || 0) + 1;

  const usage = usageMap[apiKey];

  const remaining = Math.max(limit - usage, 0);

  return NextResponse.json({
    ok: true,
    plan,
    usage,
    limit,
    remaining,
    blocked: usage >= limit
  });
}
