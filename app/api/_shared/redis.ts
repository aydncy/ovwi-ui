import { Redis } from "@upstash/redis";

export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function safeIncr(key: string) {
  try {
    if (!redis) return null;
    return await redis.incr(key);
  } catch (e) {
    console.error("Redis error:", e);
    return null;
  }
}
