'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const login = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard'
      }
    })

    if (error) {
      setMsg('Error sending link')
    } else {
      setMsg('Check your email for login link')
    }
  }

  return (
    <main className="container">
      <h1>Login</h1>

      <input
        className="input"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="you@company.com"
      />

      <button className="btn-primary" onClick={login}>
        Send Magic Link
      </button>

      {msg && <p>{msg}</p>}
    </main>
  )
}
