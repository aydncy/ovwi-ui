import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { user_id } = await req.json();

  const key = "ovwi_" + Math.random().toString(36).substring(2, 15);

  if (db) {
    await db.from("api_keys").insert({
      user_id,
      key,
      plan: "free",
      remaining_credits: 100,
    });
  }

  return NextResponse.json({ key });
}
