import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: Request){
  const url = new URL(req.url)
  const email = url.searchParams.get('email')

  if(email){
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/onboard`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    })
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
  )
}
