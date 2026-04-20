'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Nav(){

  const [user,setUser] = useState(null)

  useEffect(()=>{
    // mevcut session
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user)
    })

    // auth değişimini dinle
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session)=>{
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  },[])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="nav">
      <div className="logo">OVWI</div>

      <div className="nav-right">
        <Link href="/" className="btn">Home</Link>
        <Link href="/docs" className="btn">Docs</Link>

        {user && (
          <Link href="/dashboard" className="btn">
            Dashboard
          </Link>
        )}

        {!user && (
          <Link href="/login" className="btn-primary">
            Login
          </Link>
        )}

        {user && (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  )
}
