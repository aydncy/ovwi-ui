'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Nav(){

  const [user,setUser] = useState<any>(undefined)

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user ?? null)
    })

    const { data: listener } =
      supabase.auth.onAuthStateChange((_e,session)=>{
        setUser(session?.user ?? null)
      })

    return ()=>listener.subscription.unsubscribe()
  },[])

  if(user === undefined) return null

  return (
    <div className="nav">
      <div>OVWI</div>

      <div>
        <Link href="/" className="btn">Home</Link>
        <Link href="/docs" className="btn">Docs</Link>

        {user && <Link href="/dashboard" className="btn">Dashboard</Link>}

        {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <Link href="/admin" className="btn">Admin</Link>
        )}

        {!user && <Link href="/login" className="btn-primary">Login</Link>}

        {user && (
          <button
            className="btn"
            onClick={async ()=>{
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}
