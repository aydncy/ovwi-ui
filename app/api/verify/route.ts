import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request){

  const { apiKey } = await req.json()

  const { data: key } = await supabase
    .from('api_keys')
    .select('*')
    .eq('key', apiKey)
    .single()

  if(!key) return NextResponse.json({ ok:false })

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', key.email)
    .single()

  if(!user) return NextResponse.json({ ok:false })

  if(user.usage_count >= user.limit){
    return NextResponse.json({
      ok:false,
      upgrade:true,
      checkout: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
    })
  }

  const newUsage = user.usage_count + 1

  await supabase
    .from('users')
    .update({ usage_count:newUsage })
    .eq('email', key.email)

  //  HISTORY INSERT
  await supabase.from('usage_history').insert({
    email:key.email,
    usage:newUsage
  })

  return NextResponse.json({
    ok:true,
    usage:newUsage
  })
}
