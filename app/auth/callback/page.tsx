'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase }
from '../../lib/supabaseBrowser'

export default function CallbackPage(){

  const router = useRouter()

  useEffect(()=>{

    async function boot(){

      const hash =
        window.location.hash

      if(hash){

        const params =
          new URLSearchParams(
            hash.substring(1)
          )

        const access_token =
          params.get('access_token')

        const refresh_token =
          params.get('refresh_token')

        if(
          access_token &&
          refresh_token
        ){

          await supabase.auth.setSession({
            access_token,
            refresh_token
          })

          router.replace('/dashboard')
          return
        }
      }

      const {
        data:{ session }
      } = await supabase.auth.getSession()

      if(session){
        router.replace('/dashboard')
      }else{
        router.replace('/login')
      }
    }

    boot()

  },[])

  return (
    <main
      style={{
        minHeight:'100vh',
        background:'#030712',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        color:'white',
        fontSize:24,
        fontWeight:700
      }}
    >
      Initializing workspace...
    </main>
  )
}
