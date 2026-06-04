import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.error("ENV ERROR:", {
        SUPABASE_URL,
        SUPABASE_KEY
      });

      return NextResponse.json(
        { error: 'Supabase env missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { apiKey } = await req.json();

    const { data: keyData } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (!keyData) {
      return NextResponse.json({ error: 'invalid key' }, { status: 401 });
    }

    const { data: usageData } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', keyData.user_id)
      .single();

    const used = (usageData?.used || 0) + 1;
    const limit = usageData?.limit || 50;

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
    console.error("VERIFY ERROR:", e);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
