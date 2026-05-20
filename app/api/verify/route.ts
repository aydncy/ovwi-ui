import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

    if (!email) {
      return NextResponse.json({
        ok: false,
        error: 'missing_email'
      }, { status: 400 })
    }

    let { data } = await supabase
      .from('ovwi_usage')
      .select('*')
      .eq('email', email)
      .single()

    if (!data) {
      const inserted = await supabase
        .from('ovwi_usage')
        .insert({
          email,
          plan: 'free',
          usage: 0
        })
        .select()
        .single()

      data = inserted.data
    }

    const limit = LIMITS[data.plan] || 50

    if (data.usage >= limit) {
      return NextResponse.json({
        ok: false,
        error: 'limit_reached',
        usage: data.usage,
        limit,
        remaining: 0,
        upgrade: true,
        plan: data.plan
      })
    }

    const nextUsage = data.usage + 1

    await supabase
      .from('ovwi_usage')
      .update({
        usage: nextUsage,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)

    return NextResponse.json({
      ok: true,
      verified: true,
      usage: nextUsage,
      limit,
      remaining: Math.max(limit - nextUsage, 0),
      plan: data.plan
    })

  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      error: e.message
    }, { status: 500 })
  }
}
