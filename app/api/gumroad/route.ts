import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET OK" });
}

export async function POST() {
  console.log("✅ WEBHOOK HIT");
  return NextResponse.json({ success: true });
}
