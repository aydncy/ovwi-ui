import { NextRequest, NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const email = body.get("email") as string;
    const product_name = (body.get("product_name") as string) || "";

    console.log("💰 PURCHASE:", email, product_name);

    if (!email) {
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    // ✅ PLAN MAPPING
    let plan = "free";
    let limit = 50;

    const product = product_name.toLowerCase();

    if (product.includes("pro")) {
      plan = "pro";
      limit = 2000;
    }

    if (product.includes("scale")) {
      plan = "scale";
      limit = 10000;
    }

    // ✅ USER UPDATE
    const { error } = await sb
      .from("users_licenses")
      .update({
        plan,
        monthly_limit: limit,
      })
      .eq("user_email", email);

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ PLAN UPGRADED:", email, plan);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
