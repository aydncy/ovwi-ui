import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const email = body.email;

  const key = "ovwi_" + createHash("sha256")
    .update(email + Date.now())
    .digest("hex")
    .slice(0, 32);

  return NextResponse.json({
    ok: true,
    apiKey: key
  });
}
