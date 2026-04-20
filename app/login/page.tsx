'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [msg, setMsg] = useState('')
  const router = useRouter()

  // 1) kod gönder
  const sendCode = async () => {
    setMsg('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    })

    if (error) {
      setMsg('Failed to send code')
      return
    }

    setStep('code')
    setMsg('Code sent to your email')
  }

  // 2) kod doğrula
  const verifyCode = async () => {
    setMsg('')

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email'
    })

    if (error) {
      setMsg('Invalid or expired code')
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="container">
      <h1>Login</h1>

      {step === 'email' && (
        <>
          <input
            className="input"
            placeholder="you@company.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button
            className="btn-primary"
            onClick={sendCode}
            style={{marginTop:10}}
          >
            Send Code
          </button>
        </>
      )}

      {step === 'code' && (
        <>
          <input
            className="input"
            placeholder="Enter code"
            value={code}
            onChange={(e)=>setCode(e.target.value)}
          />

          <button
            className="btn-primary"
            onClick={verifyCode}
            style={{marginTop:10}}
          >
            Verify
          </button>
        </>
      )}

      {msg && <p style={{marginTop:10}}>{msg}</p>}
    </main>
  )
}
