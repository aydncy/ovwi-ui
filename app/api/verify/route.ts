import { NextResponse } from 'next/server';

let usage = 12;

export async function POST() {
  usage = Math.min(usage + 1, 50);
  return NextResponse.json({
    ok: true,
    usage,
    limit: 50,
    remaining: 50 - usage
  });
}
