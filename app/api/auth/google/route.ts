import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(){

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data,error } =
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo:
          'https://ovwi.cyzora.com/auth/callback'
      }
    })

  if(error || !data?.url){
    return NextResponse.redirect(
      'https://ovwi.cyzora.com/login'
    )
  }

  return NextResponse.redirect(data.url)
}
