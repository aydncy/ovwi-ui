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

    async function init(){

      const {
        data:{ session }
      } = await supabase.auth.getSession()

      if(session){
        router.replace('/dashboard')
      }else{
        router.replace('/login')
      }
    }

    init()

  },[])

  return (
    <main
      style={{
        background:'#030712',
        minHeight:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        fontSize:24,
        fontWeight:700
      }}
    >
      Connecting your workspace...
    </main>
  )
}
