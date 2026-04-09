export function getCheckoutLink(plan: string) {
  if (plan === "pro") {
    return process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO!;
  }

  if (plan === "enterprise") {
    return process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE!;
  }

  if (plan === "scale") {
    return process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE!;
  }

  return "";
}
