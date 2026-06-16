import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateKey() {
  return 'ovwi_' + Math.random().toString(36).substring(2, 10);
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'No email' });
  }

  // ✅ kullanıcı var mı?
  let { data: user } = await supabase
    .from('api_users')
    .select('*')
    .eq('email', email)
    .single();

  // ✅ yoksa oluştur
  if (!user) {
    const apiKey = generateKey();

    const { data: newUser } = await supabase
      .from('api_users')
      .insert({
        email,
        api_key: apiKey,
        usage: 0,
        limit: 50
      })
      .select()
      .single();

    user = newUser;
  }

  return NextResponse.json({
    apiKey: user.api_key,
    usage: user.usage,
    limit: user.limit
  });
}
