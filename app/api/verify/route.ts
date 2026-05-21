import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const usageRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ovwi.cyzora.com'}/api/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    if (!usageRes.ok) throw new Error('Usage update failed');

    const usageData = await usageRes.json();

    return NextResponse.json({
      ok: true,
      message: "Verification successful",
      timestamp: new Date().toISOString(),
      ...usageData
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Verification failed" }, { status: 500 });
  }
}
