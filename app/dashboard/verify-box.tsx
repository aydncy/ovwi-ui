'use client'

import { useState } from 'react'

export default function VerifyBox({ apiKey }:{ apiKey:string }){

  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState<any>(null)

  const run = async () => {
    setLoading(true)

    const res = await fetch('/api/verify',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        apiKey
      })
    })

    const data = await res.json()

    setResult(data)
    setLoading(false)
  }

  return (
    <div className="card" style={{marginTop:20, padding:20}}>

      <h3>One Click Verify</h3>

      <button
        className="btn-primary"
        onClick={run}
        disabled={loading}
        style={{marginTop:10}}
      >
        {loading ? 'Running...' : 'Run Verify'}
      </button>

      {result && (
        <pre style={{
          marginTop:15,
          background:'#020617',
          padding:10,
          borderRadius:8
        }}>
{JSON.stringify(result,null,2)}
        </pre>
      )}

    </div>
  )
}
