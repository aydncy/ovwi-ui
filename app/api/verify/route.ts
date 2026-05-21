import { NextResponse } from 'next/server';

export async function POST() {
  // Usage API'yi çağır (gerçek decrement için)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/usage`, {
    method: 'POST',
  });
  
  const data = await res.json();
  
  return NextResponse.json({
    ok: true,
    ...data,
    message: "Verification successful"
  });
}
