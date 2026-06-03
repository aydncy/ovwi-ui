import { NextResponse } from "next/server";
import { safeIncr } from "../_shared/redis";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || "anonymous_user";

    if (!process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SERVICE_UNAVAILABLE",
            message: "Redis not configured",
          },
        },
        { status: 503 }
      );
    }

    const key = `usage:${email}`;
    const newCount = await safeIncr(key);

    const LIMIT = 50;

    if (newCount === null) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SERVICE_UNAVAILABLE",
            message: "Redis unavailable",
          },
        },
        { status: 503 }
      );
    }

    const remaining = Math.max(0, LIMIT - newCount);
    const ok = newCount <= LIMIT;

    if (!ok) {
      return NextResponse.json({
        success: false,
        error: {
          code: "LIMIT_EXCEEDED",
          message: "Usage limit exceeded",
        },
        usage: newCount,
        limit: LIMIT,
        remaining,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        usage: newCount,
        limit: LIMIT,
        remaining,
        email,
      },
    });
  } catch (error) {
    console.error("Verify Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "Unexpected error",
        },
      },
      { status: 500 }
    );
  }
}
