import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    console.log("VERIFY HIT");

    return NextResponse.json({
      ok: true,
      remaining: 999
    });

  } catch (e) {
    return NextResponse.json({ error: "fail" }, { status: 500 });
  }
}
