export const lemon = {
  checkout: {
    pro: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO,
    scale: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE,
    enterprise: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE,
  },
  webhookSecret: process.env.LEMON_WEBHOOK_SECRET || "",
};
