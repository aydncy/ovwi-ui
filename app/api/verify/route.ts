import { billingResponse } from "@/lib/billing/engine";

let usage = 12;

export async function POST() {
  usage++;

  // simulated plan (sonradan DB bağlanacak)
  const plan = "free";

  return billingResponse(usage, plan);
}
