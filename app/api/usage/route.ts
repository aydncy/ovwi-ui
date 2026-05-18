import { NextResponse } from 'next/server'

const globalAny: any = globalThis

if (!globalAny.ovwi_usage_db) {
  globalAny.ovwi_usage_db = {}
}

const db = globalAny.ovwi_usage_db

const LIMITS: any = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const email = body?.email
    const apiKey = body?.apiKey
    const plan = body?.plan || 'free'

    if (!email && !apiKey) {
      return NextResponse.json({
        ok: false,
        error: 'missing_identity'
      }, { status: 400 })
    }

    const id = email || apiKey

    if (!db[id]) {
      db[id] = {
        usage: 0,
        plan
      }
    }

    const usage = db[id].usage || 0
    const currentPlan = db[id].plan || plan
    const limit = LIMITS[currentPlan] || 50

    return NextResponse.json({
      ok: true,
      usage,
      limit,
      remaining: Math.max(limit - usage, 0),
      plan: currentPlan
    })

  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      error: e.message
    }, { status: 500 })
  }
}
