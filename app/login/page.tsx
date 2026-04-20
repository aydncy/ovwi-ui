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

  // SEND OTP (signup + login)
  const send = async () => {
    setMsg('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    })

    if(error){
      console.log(error)
      setMsg(error.message)
      return
    }

    setStep('code')
    setMsg('Code sent to your email')
  }

  // VERIFY OTP
  const verify = async () => {
    setMsg('')

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email'
    })

    if(error){
      console.log(error)
      setMsg(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="container">

      <div className="card" style={{
        maxWidth:420,
        margin:"auto",
        marginTop:100,
        padding:30
      }}>

        <h1 style={{marginBottom:20}}>Sign up / Login</h1>

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
              onClick={send}
              style={{marginTop:10, width:"100%"}}
            >
              Continue
            </button>
          </>
        )}

        {step === 'code' && (
          <>
            <input
              className="input"
              placeholder="Enter 6 digit code"
              value={code}
              onChange={(e)=>setCode(e.target.value)}
              style={{letterSpacing:6, textAlign:"center"}}
            />

            <button
              className="btn-primary"
              onClick={verify}
              style={{marginTop:10, width:"100%"}}
            >
              Verify
            </button>
          </>
        )}

        {msg && (
          <p style={{marginTop:10, opacity:0.7}}>
            {msg}
          </p>
        )}

      </div>

    </main>
  )
}
