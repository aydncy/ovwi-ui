import { NextResponse } from 'next/server';

let usage = 0;
const LIMIT = 1000;

export async function POST() {
  usage++;

  const remaining = LIMIT - usage;

  return NextResponse.json({
    ok: true,
    remaining
  });
}
