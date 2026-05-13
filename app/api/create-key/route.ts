import { NextResponse } from 'next/server';
import crypto from 'crypto';

const usageStore = globalThis as any;

if (!usageStore.ovwi_usage_db) {
  usageStore.ovwi_usage_db = {};
}

export async function POST() {
  const apiKey = 'ovwi_' + crypto.randomBytes(24).toString('hex');

  usageStore.ovwi_usage_db[apiKey] = {
    usage: 0,
    plan: 'free',
    createdAt: Date.now()
  };

  return NextResponse.json({
    ok: true,
    apiKey,
    usage: 0,
    limit: 50,
    remaining: 50,
    plan: 'free'
  });
}
