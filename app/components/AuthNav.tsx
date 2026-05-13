'use client'

import Link from 'next/link'
import { useEffect,useState } from 'react'
import { usePathname,useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseBrowser'

export default function AuthNav(){

  const pathname = usePathname()
  const router = useRouter()

  const [session,setSession] =
    useState<any>(null)

  useEffect(()=>{

    supabase.auth.getSession()
      .then(({data})=>{

        setSession(data.session)

      })

    const {
      data:{ subscription }
    } = supabase.auth.onAuthStateChange(
      (_e,s)=>{

        setSession(s)

      }
    )

    return ()=>subscription.unsubscribe()

  },[])

  const logged = !!session

  return (
    <nav
      style={{
        height:84,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        padding:'0 40px',
        background:'#020617',
        borderBottom:
          '1px solid rgba(255,255,255,.06)',
        position:'sticky',
        top:0,
        zIndex:999
      }}
    >

      <Link
        href="/"
        style={{
          color:'white',
          textDecoration:'none',
          fontSize:30,
          fontWeight:900
        }}
      >
        OVWI
      </Link>

      <div
        style={{
          display:'flex',
          gap:18,
          alignItems:'center'
        }}
      >

        <Link
          href="/docs"
          style={{
            color:'white',
            opacity:.75,
            textDecoration:'none'
          }}
        >
          Docs
        </Link>

        {logged && pathname !== '/dashboard' && (
          <Link
            href="/dashboard"
            style={{
              color:'white',
              textDecoration:'none'
            }}
          >
            Dashboard
          </Link>
        )}

        {!logged ? (
          <Link
            href="/login"
            style={{
              background:'#2563eb',
              color:'white',
              textDecoration:'none',
              padding:'12px 20px',
              borderRadius:14,
              fontWeight:700
            }}
          >
            Login
          </Link>
        ) : (
          <button
            onClick={async()=>{

              await supabase.auth.signOut()

              router.replace('/')

            }}
            style={{
              border:'none',
              background:'#2563eb',
              color:'white',
              padding:'12px 20px',
              borderRadius:14,
              fontWeight:700,
              cursor:'pointer'
            }}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  )
}
