import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(users || [])
}

export async function POST(req: Request) {
  const { email, action, value } = await req.json()

  if (!email || !action) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  if (action === 'upgrade') {
    const { error } = await supabase
      .from('users')
      .update({ plan: value, usage_count: 0 })
      .eq('email', email)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  }

  if (action === 'reset_usage') {
    const { error } = await supabase
      .from('users')
      .update({ usage_count: 0 })
      .eq('email', email)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  }

  if (action === 'create_key') {
    const key = `ovwi_live_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

    const { error } = await supabase
      .from('api_keys')
      .insert({
        email,
        key,
        plan: 'free'
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, key })
  }

  if (action === 'delete_keys') {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('email', email)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'unknown_action' }, { status: 400 })
}
