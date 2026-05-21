import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  // Lemon event structure
  const eventName = body.meta?.event_name;

  if (!db) {
    return NextResponse.json({ ok: true, mock: true });
  }

  if (eventName === "subscription_created") {
    await db.from("user_billing").upsert({
      user_id: body.data.attributes.user_email,
      plan: body.data.attributes.variant_name,
      status: "active",
    });
  }

  if (eventName === "subscription_cancelled") {
    await db
      .from("user_billing")
      .update({ plan: "free", status: "cancelled" })
      .eq("user_id", body.data.attributes.user_email);
  }

  return NextResponse.json({ received: true });
}
