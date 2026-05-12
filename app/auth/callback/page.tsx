'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AuthCallbackPage(){

  const router = useRouter()

  useEffect(()=>{

    const supabase =
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

    supabase.auth.getSession()
      .then(({ data })=>{

        if(data.session){
          router.replace('/dashboard')
        }else{
          router.replace('/login')
        }

      })

  },[])

  return (
    <main
      style={{
        minHeight:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        background:'#050816',
        color:'white',
        fontSize:22,
        fontWeight:700
      }}
    >
      Signing you in...
    </main>
  )
}
