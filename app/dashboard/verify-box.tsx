'use client'

import { useState } from 'react'

export default function VerifyBox({ apiKey }){

  const [res,setRes] = useState<any>(null)
  const [loading,setLoading] = useState(false)

  const run = async () => {
    setLoading(true)

    const r = await fetch('/api/verify',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ apiKey })
    })

    const json = await r.json()

    setRes(json)
    setLoading(false)
  }

  return (
    <div className="card" style={{marginTop:20}}>

      <h3>Quick Test</h3>

      <button
        className="btn-primary"
        style={{marginTop:10}}
        onClick={run}
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Test'}
      </button>

      {res && (
        <pre style={{
          marginTop:10,
          background:'#020617',
          padding:10,
          borderRadius:8,
          fontSize:12
        }}>
          {JSON.stringify(res,null,2)}
        </pre>
      )}

    </div>
  )
}
