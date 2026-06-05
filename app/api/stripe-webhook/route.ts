import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type === 'checkout.session.completed') {
    const email = body.data.object.customer_email;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === email);

    if (user) {
      await supabase.from('users_usage')
        .update({ monthly_limit: 1000 })
        .eq('user_id', user.id);
    }
  }

  return NextResponse.json({ received: true });
}
