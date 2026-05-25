let usageMap: Record<string, number> = {};

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!usageMap[email]) usageMap[email] = 0;

  usageMap[email]++;

  return Response.json({
    usage: usageMap[email],
    limit: 50,
    remaining: 50 - usageMap[email]
  });
}