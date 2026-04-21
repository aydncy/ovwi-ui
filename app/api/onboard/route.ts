import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){

  const { email } = await req.json()

  if(!email){
    return NextResponse.json({ ok:false })
  }

  // USER VAR MI?
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if(!existing){

    // USER CREATE
    await supabase.from('users').insert({
      email,
      plan:'free',
      usage_count:0,
      limit:50
    })

    // API KEY CREATE
    const key = 'ovwi_live_' + Date.now()

    await supabase.from('api_keys').insert({
      email,
      key,
      plan:'free'
    })
  }

  return NextResponse.json({ ok:true })
}
