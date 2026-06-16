import { NextResponse } from 'next/server';
import { getUser, setUser } from '../_store';

export async function POST(req: Request) {
  const { email } = await req.json();

  let user = getUser(email);

  if (!user) {
    return NextResponse.json({ error: 'USER_NOT_FOUND' });
  }

  // 🚨 LIMIT BLOCK
  if (user.usage >= user.limit) {
    return NextResponse.json({
      error: 'LIMIT_REACHED',
      usage: user.usage,
      limit: user.limit
    });
  }

  user.usage += 1;
  setUser(email, user);

  return NextResponse.json({
    success: true,
    usage: user.usage,
    limit: user.limit
  });
}
