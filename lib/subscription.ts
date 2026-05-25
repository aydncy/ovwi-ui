export type Plan = "free" | "pro" | "enterprise";

export function getPlanFromStripeStatus(status: string): Plan {
  if (status === "active") return "pro";
  if (status === "trialing") return "pro";
  return "free";
}
