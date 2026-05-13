export const CHECKOUTS = {
  pro: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO || '',
  enterprise: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE || '',
  scale: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE || ''
};

export function getCheckoutLink(plan: string) {
  if (plan === 'pro') return CHECKOUTS.pro;
  if (plan === 'enterprise') return CHECKOUTS.enterprise;
  if (plan === 'scale') return CHECKOUTS.scale;
  return '';
}
