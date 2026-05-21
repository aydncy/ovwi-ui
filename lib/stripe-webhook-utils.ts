export function verifyWebhookReady() {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn("Stripe webhook not configured - running in mock mode");
    return false;
  }
  return true;
}
