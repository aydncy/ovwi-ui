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

  if (!email || !product) {
    return NextResponse.json({ ok: false });
  }

  let plan = "free";

  if (product.includes("pro")) plan = "pro";
  if (product.includes("enterprise")) plan = "enterprise";
  if (product.includes("scale")) plan = "scale";

  await supabase
    .from("users")
    .upsert({
      email,
      plan,
      usage_count: 0
    });

  return NextResponse.json({ ok: true });
}
