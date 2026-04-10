import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const email = body?.data?.attributes?.user_email;
  const product = body?.data?.attributes?.product_name?.toLowerCase();

  let plan = "free";
  if (product?.includes("pro")) plan = "pro";
  else if (product?.includes("enterprise")) plan = "enterprise";
  else if (product?.includes("scale")) plan = "scale";

  const key = "ovwi_live_" + Math.random().toString(36).substring(2, 15);

  await supabase.from("api_keys").insert({
    key,
    plan,
    usage_count: 0,
  });

  return NextResponse.json({ ok: true, key, plan });
}
