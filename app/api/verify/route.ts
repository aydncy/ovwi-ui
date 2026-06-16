import { NextResponse } from 'next/server';
import { getUser, setUser } from '../_store';

function generateKey() {
  return 'ovwi_' + Math.random().toString(36).substring(2, 10);
}

export async function POST(req: Request) {
  const { email } = await req.json();

  let user = getUser(email);

  if (!user) {
    user = {
      apiKey: generateKey(),
      usage: 0,
      limit: 50
    };

    setUser(email, user);
  }

  return NextResponse.json(user);
}
