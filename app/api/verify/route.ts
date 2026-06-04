import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // önemli
);

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'No API key' }, { status: 400 });
    }

    // key check
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (!keyData) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    }

    // usage artır
    const { data: usageData } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', keyData.user_id)
      .single();

    const used = (usageData?.used || 0) + 1;
    const limit = usageData?.limit || 1000;

    await supabase.from('usage').upsert({
      user_id: keyData.user_id,
      used,
      limit
    });

    return NextResponse.json({
      ok: true,
      remaining: limit - used
    });

  } catch (e) {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
