import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

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
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      console.log("PAYMENT SUCCESS:", event.data.object);
      break;

    case "customer.subscription.created":
      console.log("SUB CREATED:", event.data.object);
      break;

    case "customer.subscription.updated":
      console.log("SUB UPDATED:", event.data.object);
      break;

    case "customer.subscription.deleted":
      console.log("SUB CANCELLED:", event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}
