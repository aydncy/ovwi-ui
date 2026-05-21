import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json({ ok: true, mode: "mock" });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session: any = event.data.object;

      await db.from("user_billing").upsert({
        user_id: session.client_reference_id,
        stripe_customer_id: session.customer,
        stripe_subscription_id: session.subscription,
        plan: "pro",
        status: "active",
      });

      break;
    }

    case "customer.subscription.deleted": {
      const sub: any = event.data.object;

      await db
        .from("user_billing")
        .update({
          plan: "free",
          status: "canceled",
        })
        .eq("stripe_subscription_id", sub.id);

      break;
    }
  }

  return NextResponse.json({ received: true });
}
