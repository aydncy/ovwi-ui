import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json({ error: 'missing api key' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: keyData } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (!keyData) {
      return NextResponse.json({ error: 'invalid key' }, { status: 401 });
    }

    const userId = keyData.user_id;

    let { data: usage } = await supabase
      .from('users_usage')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!usage) {
      const insert = await supabase.from('users_usage')
        .insert({ user_id: userId, usage: 0, monthly_limit: 50 })
        .select()
        .single();

      usage = insert.data;
    }

    if (usage.usage >= usage.monthly_limit) {
      return NextResponse.json({
        error: 'limit reached',
        upgrade: 'https://cyzora.com'
      }, { status: 403 });
    }

    const newUsage = usage.usage + 1;

    await supabase.from('users_usage')
      .update({ usage: newUsage })
      .eq('user_id', userId);

    return NextResponse.json({
      ok: true,
      usage: newUsage,
      remaining: usage.monthly_limit - newUsage,
      powered_by: "OVWI • ClinicFlowAC"
    });

  } catch (e) {
    return NextResponse.json({ error: 'server error' });
  }
}
