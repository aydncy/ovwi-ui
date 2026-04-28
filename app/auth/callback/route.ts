import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(req: Request){

  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  if(!code){
    return NextResponse.redirect('/')
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies:{
        get(name){
          return cookieStore.get(name)?.value
        },
        set(name,value,options){
          cookieStore.set({ name,value,...options })
        },
        remove(name,options){
          cookieStore.set({ name,value:'',...options })
        }
      }
    }
  )

  // í´¥ CRITICAL: CODE â†’ SESSION
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if(error){
    console.log(error)
    return NextResponse.redirect('/login')
  }

  const email = data.user?.email

  // í´¥ ONBOARD CALL
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
