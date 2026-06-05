import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.sale_status !== "completed") {
      return NextResponse.json({ ok: true });
    }

    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: "no email" });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === email);

    if (user) {

      // ✅ upgrade log
      await supabase.from('usage_logs').insert({
        user_id: user.id,
        action: 'upgrade'
      });

      // ✅ revenue log
      await supabase.from('revenue').insert({
        user_id: user.id,
        amount: 9
      });

      // ✅ plan upgrade
      await supabase.from('users_usage')
        .update({ monthly_limit: 2000 })
        .eq('user_id', user.id);
    }

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error("WEBHOOK ERROR:", e);
    return NextResponse.json({ error: "webhook failed" });
  }
}
