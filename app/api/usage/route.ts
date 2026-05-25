let store: Record<string, number> = {};

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!store[email]) store[email] = 0;

  store[email]++;

  const usage = store[email];

  const limit = usage > 100 ? 1000 : 50;

  const blocked = usage > limit;

  return Response.json({
    usage,
    limit,
    blocked,
    upgradeRequired: blocked
  });
}
