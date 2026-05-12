import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const origin =
    'https://ovwi.cyzora.com'

  const { data,error } =
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo:
          `${origin}/auth/callback`
      }
    })

  if(error){
    return NextResponse.redirect(
      `${origin}/login`
    )
  }

  return NextResponse.redirect(
    data.url
  )
}
