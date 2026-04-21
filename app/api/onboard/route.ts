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

  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if(!existing){

    await supabase.from('users').insert({
      email,
      plan:'free',
      usage_count:0,
      limit:50
    })

    await supabase.from('api_keys').insert({
      email,
      key: 'ovwi_live_' + Date.now(),
      plan:'free'
    })
  }

  return NextResponse.json({ ok:true })
}
