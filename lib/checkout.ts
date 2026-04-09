export function getCheckoutLink(plan: string, apiKey?: string) {
  const base =
    plan === 'pro'
      ? process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
      : plan === 'enterprise'
      ? process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE
      : process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE;

  if (!base) return '';
  if (!apiKey) return base;

  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}checkout[custom][apiKey]=${encodeURIComponent(apiKey)}`;
}
