'use client'

import { useState } from 'react'

export default function VerifyBox({ apiKey }:{ apiKey:string }){

  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState<any>(null)
  const [success,setSuccess] = useState(false)

  const run = async () => {
    setLoading(true)
    setSuccess(false)

    const res = await fetch('/api/verify',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ apiKey })
    })

    const data = await res.json()

    setResult(data)
    setLoading(false)

    if(data?.ok){
      setSuccess(true)

      // glow reset
      setTimeout(()=>setSuccess(false),2000)
    }
  }

  return (
    <div className={`card ${success ? 'glow-success':''}`} style={{marginTop:20, padding:20}}>

      <h3>One Click Verify</h3>

      <button
        className="btn-primary"
        onClick={run}
        disabled={loading}
        style={{
          marginTop:10,
          transform: loading ? 'scale(0.98)' : 'scale(1)',
          transition:'all 0.2s'
        }}
      >
        {loading ? 'Running...' : 'Run Verify'}
      </button>

      {/* SUCCESS STATE */}
      {success && (
        <div style={{
          marginTop:15,
          color:'#22c55e',
          fontWeight:600
        }}>
          Verified successfully
        </div>
      )}

      {/* RESPONSE */}
      {result && (
        <pre style={{
          marginTop:15,
          background:'#020617',
          padding:10,
          borderRadius:8,
          fontSize:12
        }}>
{JSON.stringify(result,null,2)}
        </pre>
      )}

    </div>
  )
}
