import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ovwi.cyzora.com'}/api/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const usageData = await res.json();

    return NextResponse.json({
      ok: true,
      message: "Verification successful",
      ...usageData
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Verification failed" }, { status: 500 });
  }
}
