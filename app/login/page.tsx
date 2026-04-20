'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login(){

  const [email,setEmail] = useState('')
  const [code,setCode] = useState(['','','','','',''])
  const [step,setStep] = useState('email')
  const [msg,setMsg] = useState('')

  const router = useRouter()

  const send = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options:{ shouldCreateUser:true }
    })

    if(error){
      setMsg(error.message)
      return
    }

    setStep('code')
  }

  const verify = async () => {
    const token = code.join('')

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type:'email'
    })

    if(error){
      setMsg('Invalid code')
      return
    }

    //  ONBOARDING'E GİT
    router.push('/onboarding')
  }

  return (
    <main className="container">
      <h1>Login</h1>

      {step === 'email' && (
        <>
          <input
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <button className="btn-primary" onClick={send}>
            Send Code
          </button>
        </>
      )}

      {step === 'code' && (
        <>
          <input
            className="input"
            value={code.join('')}
            onChange={(e)=>setCode(e.target.value.split(''))}
          />
          <button className="btn-primary" onClick={verify}>
            Verify
          </button>
        </>
      )}

      {msg && <p>{msg}</p>}
    </main>
  )
}
