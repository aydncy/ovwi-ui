import { db } from "@/lib/db";

export async function checkApiAccess(key: string) {
  if (!db) return { allowed: true, remaining: 100 };

  const { data } = await db
    .from("api_keys")
    .select("*")
    .eq("key", key)
    .single();

  if (!data) return { allowed: false, remaining: 0 };

  return {
    allowed: data.remaining_credits > 0,
    remaining: data.remaining_credits,
  };
}
