'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {

  const [email,setEmail] = useState('')
  const [code,setCode] = useState('')
  const [step,setStep] = useState<'email'|'code'>('email')
  const [msg,setMsg] = useState('')
  const router = useRouter()

  const send = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })

    if(error){
      setMsg('Failed')
      return
    }

    setStep('code')
    setMsg('Code sent')
  }

  const verify = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email'
    })

    if(error){
      setMsg('Invalid code')
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="container">

      <div className="card" style={{
        maxWidth:400,
        margin:"auto",
        marginTop:80,
        padding:30
      }}>

        <h1 style={{marginBottom:20}}>Login</h1>

        {step === 'email' && (
          <>
            <input
              className="input"
              placeholder="you@company.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <button className="btn-primary" onClick={send} style={{marginTop:10}}>
              Send Code
            </button>
          </>
        )}

        {step === 'code' && (
          <>
            <input
              className="input"
              placeholder="123456"
              value={code}
              onChange={(e)=>setCode(e.target.value)}
              style={{letterSpacing:6, textAlign:"center"}}
            />

            <button className="btn-primary" onClick={verify} style={{marginTop:10}}>
              Verify
            </button>
          </>
        )}

        {msg && <p style={{marginTop:10, opacity:0.7}}>{msg}</p>}

      </div>

    </main>
  )
}
