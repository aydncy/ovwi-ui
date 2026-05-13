'use client'

import { useState } from 'react'

export default function VerifyBox(){

  const [email,setEmail] =
    useState('')

  const [result,setResult] =
    useState('')

  async function run(){

    const res = await fetch(
      '/api/test-key',
      {
        method:'POST',
        headers:{
          'Content-Type':
            'application/json'
        },
        body:JSON.stringify({
          email
        })
      }
    )

    const data = await res.json()

    setResult(
      data.verified
        ? 'Verification Successful'
        : 'Verification Failed'
    )
  }

  return (
    <div
      style={{
        marginTop:40,
        background:
          'rgba(255,255,255,.05)',
        border:
          '1px solid rgba(255,255,255,.08)',
        borderRadius:28,
        padding:28,
        maxWidth:680
      }}
    >

      <h2
        style={{
          marginTop:0
        }}
      >
        Test API Verification
      </h2>

      <input
        value={email}
        onChange={e=>
          setEmail(e.target.value)
        }
        placeholder="you@company.com"
        style={{
          width:'100%',
          height:56,
          borderRadius:16,
          border:'none',
          padding:'0 18px',
          background:'#0f172a',
          color:'white',
          marginTop:14
        }}
      />

      <button
        onClick={run}
        style={{
          marginTop:18,
          height:54,
          width:'100%',
          border:'none',
          borderRadius:16,
          background:
            'linear-gradient(90deg,#2563eb,#06b6d4)',
          color:'white',
          fontWeight:800,
          cursor:'pointer'
        }}
      >
        Verify Webhook
      </button>

      {result && (
        <div
          style={{
            marginTop:18,
            opacity:.8
          }}
        >
          {result}
        </div>
      )}

    </div>
  )
}
