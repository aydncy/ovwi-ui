import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body?.meta?.event_name;
    const data = body?.data?.attributes;

    if (event !== "order_created") {
      return NextResponse.json({ ok: true });
    }

    // Lemon custom field (apiKey)
    const custom = data?.custom_data || data?.custom || {};
    const apiKey =
      custom?.apiKey ||
      body?.data?.meta?.custom_data?.apiKey ||
      body?.meta?.custom_data?.apiKey;

    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "missing_api_key" });
    }

    const product = String(data?.product_name || '').toLowerCase();

    let plan = "free";
    if (product.includes("pro")) plan = "pro";
    if (product.includes("enterprise")) plan = "enterprise";
    if (product.includes("scale")) plan = "scale";

    // api_keys tablosundan user bul
    const { data: keyRow } = await supabase
      .from("api_keys")
      .select("email")
      .eq("key", apiKey)
      .single();

    if (!keyRow?.email) {
      return NextResponse.json({ ok: false, error: "key_not_found" });
    }

    // users update
    await supabase
      .from("users")
      .upsert(
        { email: keyRow.email, plan, usage_count: 0 },
        { onConflict: "email" }
      );

    // payment log (opsiyonel)
    await supabase.from("payments").insert({
      email: keyRow.email,
      plan,
      amount: data?.total || 0,
      source: "lemon"
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
