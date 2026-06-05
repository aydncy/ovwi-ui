import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { email } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'OVWI Pro Plan',
          },
          unit_amount: 600, // €6
        },
        quantity: 1,
      },
    ],
    success_url: 'https://ovwi.cyzora.com/dashboard',
    cancel_url: 'https://ovwi.cyzora.com/upgrade',
  });

  return NextResponse.json({ url: session.url });
}
