import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function generateKey() {
  return 'ovwi_' + Math.random().toString(36).substring(2, 20);
}

export async function POST(req: Request) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ error: 'no auth' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase.auth.getUser(
    token.replace('Bearer ', '')
  );

  const userId = data.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'no user' }, { status: 401 });
  }

  const apiKey = generateKey();

  await supabase.from('api_keys').insert({
    user_id: userId,
    key: apiKey
  });

  return NextResponse.json({
    key: apiKey
  });
}
