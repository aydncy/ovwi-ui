'use client'

import { useEffect, useState } from 'react'

export default function VerifyBox(){

  const [apiKey,setApiKey] = useState('')
  const [res,setRes] = useState<any>(null)

  useEffect(()=>{
    fetch('/api/dashboard')
      .then(r=>r.json())
      .then(d=>{
        if(d.keys?.length){
          setApiKey(d.keys[0])
        }
      })
  },[])

  const run = async () => {
    const r = await fetch('/api/verify',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ apiKey })
    })

    const json = await r.json()
    setRes(json)
  }

  return (
    <div className="card" style={{marginTop:20}}>

      <h3>Quick Test</h3>

      <button className="btn-primary" onClick={run}>
        Run Test
      </button>

      {res && (
        <pre style={{marginTop:10}}>
          {JSON.stringify(res,null,2)}
        </pre>
      )}

    </div>
  )
}
