import { NextResponse } from 'next/server';
import { generateApiKey } from '@/lib/api-key';

export async function POST() {
  const key = generateApiKey();

  return NextResponse.json({
    ok: true,
    apiKey: key
  });
}
