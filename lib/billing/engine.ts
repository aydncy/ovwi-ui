import { NextResponse } from "next/server";

export type Plan = "free" | "pro" | "scale" | "enterprise";

const LIMITS: Record<Plan, number> = {
  free: 50,
  pro: 1000,
  scale: 100000,
  enterprise: 10000
};

export function getLimit(plan: Plan) {
  return LIMITS[plan] || LIMITS.free;
}

export function billingResponse(usage: number, plan: Plan) {
  const limit = getLimit(plan);

  return NextResponse.json({
    ok: true,
    usage,
    limit,
    remaining: Math.max(limit - usage, 0),
    plan
  });
}
