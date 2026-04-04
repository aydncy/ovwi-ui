"use client"

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://ovwi.cyzora.com/auth/callback'
      }
    })
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <button onClick={login}>Login with Google</button>
    </div>
  )
}
