'use client'

import Link from 'next/link'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseBrowser'

export default function AuthNav(){

  const router = useRouter()

  const [logged,setLogged] =
    useState(false)

  useEffect(()=>{

    supabase.auth.getSession()
      .then(({data})=>{

        setLogged(
          !!data.session
        )

      })

    const {
      data:{ subscription }
    } = supabase.auth.onAuthStateChange(
      (_e,s)=>{

        setLogged(!!s)

      }
    )

    return ()=>subscription.unsubscribe()

  },[])

  return (
    <nav
      style={{
        height:82,
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
          fontWeight:900,
          fontSize:30
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

        {logged ? (
          <>
            <Link
              href="/dashboard"
              style={{
                color:'white',
                textDecoration:'none'
              }}
            >
              Dashboard
            </Link>

            <button
              onClick={async()=>{

                await supabase.auth.signOut()

                router.replace('/')

              }}
              style={{
                border:'none',
                background:'#2563eb',
                color:'white',
                padding:'12px 18px',
                borderRadius:14,
                fontWeight:700,
                cursor:'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              background:'#2563eb',
              color:'white',
              textDecoration:'none',
              padding:'12px 18px',
              borderRadius:14,
              fontWeight:700
            }}
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  )
}
