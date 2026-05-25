import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    engine: 'OVWI Money Engine v3.2',
    billing: 'active',
    monetization: true
  });
}
