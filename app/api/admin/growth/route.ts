import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(){

  const { data: users } = await supabase
    .from('users')
    .select('*')

  const totalUsers = users?.length || 0
  const paidUsers = users?.filter(u=>u.plan !== 'free').length || 0

  const prices:any = {
    free:0,
    pro:9,
    enterprise:29,
    scale:79
  }

  const mrr =
    users?.reduce((sum,u)=>sum + (prices[u.plan]||0),0) || 0

  const conversion =
    totalUsers > 0
      ? (paidUsers / totalUsers * 100).toFixed(1)
      : 0

  return NextResponse.json({
    totalUsers,
    paidUsers,
    mrr,
    conversion
  })
}
