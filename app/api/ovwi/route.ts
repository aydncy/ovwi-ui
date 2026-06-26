import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = body.text || '';

    const optimized = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(' ')
      .filter(w => w.length > 2)
      .join(' ');

    return NextResponse.json({
      success: true,
      data: {
        optimized_text: optimized || 'optimized result'
      }
    });
  } catch {
    return NextResponse.json({ error: 'fail' }, { status: 500 });
  }
}
