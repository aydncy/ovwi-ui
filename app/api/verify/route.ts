import { NextResponse } from 'next/server';

// Basit state (Production'da Redis/DB kullanılmalı)
let usage = 12;

export async function POST(req: Request) {
  usage++;
  const body = await req.json().catch(() => ({}));
  
  return NextResponse.json({
    ok: true,
    usage,
    limit: 50,
    remaining: 50 - usage,
    received: body
  });
}
