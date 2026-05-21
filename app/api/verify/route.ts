import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ovwi.cyzora.com'}/api/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    return NextResponse.json({
      ok: true,
      message: "Verification successful",
      timestamp: new Date().toISOString(),
      ...data
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Verification failed" }, { status: 500 });
  }
}
