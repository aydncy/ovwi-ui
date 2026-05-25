import { NextResponse } from "next/server";

const store = new Map<string, number>();

export async function POST(req: Request) {
  const { email } = await req.json();

  const current = store.get(email) || 0;
  const updated = current + 1;

  store.set(email, updated);

  const limit = updated > 100 ? 1000 : 50;
  const blocked = updated > limit;

  return NextResponse.json({
    email,
    usage: updated,
    limit,
    remaining: Math.max(limit - updated, 0),
    blocked,
    upgrade: blocked
  });
}
