import { NextResponse } from "next/server";
import { sb } from "@/lib/supabase";

export async function POST(req: Request) {

  const { license_key } = await req.json();

  const res = await fetch("https://api.gumroad.com/v2/licenses/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      product_id: process.env.GUMROAD_PRO_ID!,
      license_key
    })
  });

  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({ success: false });
  }

  const product = data.purchase.product_name || "";

  let plan = "free";

  if (product.toLowerCase().includes("scale")) {
    plan = "scale";
  } else if (product.toLowerCase().includes("pro")) {
    plan = "pro";
  }

  const { data: userData } = await sb.auth.getUser();

  if (!userData.user) {
    return NextResponse.json({ success: false });
  }

  await sb.from("profiles").upsert({
    id: userData.user.id,
    plan
  });

  return NextResponse.json({ success: true, plan });
}
