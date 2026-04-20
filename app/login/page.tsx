'use client'

import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {

  const [email,setEmail] = useState('')
  const [step,setStep] = useState('email')
  const [code,setCode] = useState(['','','','','',''])
  const [msg,setMsg] = useState('')
  const [loading,setLoading] = useState(false)
  const [cooldown,setCooldown] = useState(0)

  const inputs = useRef<any[]>([])
  const router = useRouter()

  // SEND OTP
  const send = async () => {
    if(loading || cooldown > 0) return

    setLoading(true)
    setMsg('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options:{ shouldCreateUser:true }
    })

    setLoading(false)

    if(error){
      setMsg(error.message)
      return
    }

    setStep('code')
    startCooldown()
  }

  // VERIFY
  const verify = async () => {
    const token = code.join('')

    if(token.length !== 6){
      setMsg('Enter full code')
      return
    }

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

  // COOLDOWN
  const startCooldown = () => {
    setCooldown(30)
    const interval = setInterval(()=>{
      setCooldown(c=>{
        if(c<=1){
          clearInterval(interval)
          return 0
        }
        return c-1
      })
    },1000)
  }

  // INPUT CHANGE
  const handleChange = (val:string, i:number) => {
    if(!/^[0-9]?$/.test(val)) return

    const newCode = [...code]
    newCode[i] = val
    setCode(newCode)

    if(val && i < 5){
      inputs.current[i+1]?.focus()
    }
  }

  // BACKSPACE
  const handleKey = (e:any, i:number) => {
    if(e.key === 'Backspace' && !code[i] && i > 0){
      inputs.current[i-1]?.focus()
    }
  }

  // PASTE
  const handlePaste = (e:any) => {
    const paste = e.clipboardData.getData('text').slice(0,6)
    if(!/^\d+$/.test(paste)) return

    const arr = paste.split('')
    setCode([...arr, ...Array(6-arr.length).fill('')])
  }

  return (
    <main className="container">

      <div className="card" style={{
        maxWidth:420,
        margin:"auto",
        marginTop:120,
        padding:30,
        textAlign:'center'
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

            <button
              className="btn-primary"
              onClick={send}
              disabled={loading || cooldown>0}
              style={{marginTop:15,width:"100%"}}
            >
              {cooldown>0 ? `Wait ${cooldown}s` :
               loading ? 'Sending...' :
               'Send Code'}
            </button>
          </>
        )}

        {step === 'code' && (
          <>
            <div
              style={{
                display:'flex',
                gap:10,
                justifyContent:'center',
                marginBottom:20
              }}
              onPaste={handlePaste}
            >
              {code.map((c,i)=>(
                <input
                  key={i}
                  ref={el=>inputs.current[i]=el}
                  value={c}
                  onChange={e=>handleChange(e.target.value,i)}
                  onKeyDown={e=>handleKey(e,i)}
                  maxLength={1}
                  style={{
                    width:45,
                    height:55,
                    textAlign:'center',
                    fontSize:24,
                    borderRadius:10,
                    border:'1px solid #334155',
                    background:'#020617',
                    color:'#fff'
                  }}
                />
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={verify}
              style={{width:"100%"}}
            >
              Verify
            </button>

            <button
              className="btn"
              onClick={send}
              disabled={cooldown>0}
              style={{marginTop:10,width:"100%"}}
            >
              {cooldown>0 ? `Resend in ${cooldown}s` : 'Resend Code'}
            </button>
          </>
        )}

        {msg && (
          <p style={{marginTop:15,opacity:0.7}}>
            {msg}
          </p>
        )}

      </div>

    </main>
  )
}
