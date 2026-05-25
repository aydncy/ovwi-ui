import { env } from './env';

export const CHECKOUTS = {
  pro: env.LEMON_PRO,
  enterprise: env.LEMON_ENTERPRISE,
  scale: env.LEMON_SCALE
};
