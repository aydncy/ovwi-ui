import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// basit memory rate limit (production’da Redis önerilir)
const map = new Map()

export async function POST(req: Request) {

  const { email } = await req.json()

  const now = Date.now()
  const last = map.get(email) || 0

  // 30s cooldown
  if(now - last < 30000){
    return NextResponse.json({
      error: 'wait'
    })
  }

  map.set(email, now)

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options:{ shouldCreateUser:true }
  })

  if(error){
    return NextResponse.json({ error: error.message })
  }

  return NextResponse.json({ ok:true })
}
