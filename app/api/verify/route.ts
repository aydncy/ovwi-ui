import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization');

    if (!token) {
      return NextResponse.json({ error: 'no auth' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: userData } = await supabase.auth.getUser(
      token.replace('Bearer ', '')
    );

    if (!userData.user) {
      return NextResponse.json({ error: 'no user' }, { status: 401 });
    }

    const userId = userData.user.id;

    let { data: usage } = await supabase
      .from('users_usage')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!usage) {
      const insert = await supabase.from('users_usage')
        .insert({
          user_id: userId,
          usage: 0,
          monthly_limit: 50
        })
        .select()
        .single();

      usage = insert.data;
    }

    if (usage.usage >= usage.monthly_limit) { return Response.json({ upgrade: true }); } {
      return NextResponse.json(
        { error: 'limit reached', upgrade: true },
        { status: 403 }
      );
    }

    const newUsage = usage.usage + 1;

    await supabase.from('users_usage')
      .update({ usage: newUsage })
      .eq('user_id', userId);

    return NextResponse.json({
      ok: true,
      usage: newUsage,
      limit: usage.monthly_limit,
      remaining: usage.monthly_limit - newUsage
    });

  } catch (e) {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
