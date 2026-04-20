'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login(){

  const [email,setEmail] = useState('')
  const [code,setCode] = useState(['','','','','',''])
  const [step,setStep] = useState('email')
  const [msg,setMsg] = useState('')
  const [cooldown,setCooldown] = useState(0)

  const router = useRouter()

  const startCooldown = () => {
    setCooldown(30)
    const i = setInterval(()=>{
      setCooldown(c=>{
        if(c<=1){ clearInterval(i); return 0 }
        return c-1
      })
    },1000)
  }

  const send = async () => {
    if(cooldown > 0) return

    const res = await fetch('/api/send-otp',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    })

    const json = await res.json()

    if(json.error === 'wait'){
      setMsg('Please wait before retry')
      return
    }

    if(json.error){
      setMsg(json.error)
      return
    }

    setStep('code')
    startCooldown()
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

    router.push('/dashboard')
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

          <button
            className="btn-primary"
            onClick={send}
            disabled={cooldown>0}
          >
            {cooldown>0 ? `Wait ${cooldown}s` : 'Send Code'}
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
