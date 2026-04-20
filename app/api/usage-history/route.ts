import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  const { data } = await supabase
    .from('usage_history')
    .select('*')
    .eq('email', email)
    .order('created_at',{ ascending:true })

  return NextResponse.json(data || [])
}
