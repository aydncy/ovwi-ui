import { getRedis } from "./upstash";

const WINDOW = 60; // seconds
const LIMIT = 30; // requests per window per IP

export async function checkRateLimit(ip: string) {
  const redis = getRedis();

  const key = `ovwi:ratelimit:${ip}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW);
  }

  if (count > LIMIT) {
    return { allowed: false, count };
  }

  return { allowed: true, count };
}
