import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET → tüm kullanıcılar
export async function GET(){
  const { data } = await supabase
    .from('users')
    .select('*')
    .order('created_at',{ ascending:false })

  return NextResponse.json(data || [])
}

// POST → aksiyonlar
export async function POST(req: Request){
  const { email, action, value } = await req.json()

  if(action === 'upgrade'){
    await supabase
      .from('users')
      .update({ plan:value, usage_count:0 })
      .eq('email', email)
  }

  if(action === 'reset'){
    await supabase
      .from('users')
      .update({ usage_count:0 })
      .eq('email', email)
  }

  if(action === 'create_key'){
    const key = 'ovwi_' + Date.now()

    await supabase
      .from('api_keys')
      .insert({ email, key })

    return NextResponse.json({ key })
  }

  return NextResponse.json({ ok:true })
}
