import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body?.meta?.event_name;

    // subscription update
    if (event === "subscription_created" || event === "subscription_updated") {
      const userEmail = body?.data?.attributes?.user_email;
      const plan = body?.data?.attributes?.variant_name;

      // TODO: DB sync (Supabase)
      console.log("SYNC USER:", userEmail, plan);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false });
  }
}