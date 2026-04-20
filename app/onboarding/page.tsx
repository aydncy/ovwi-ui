'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Onboarding(){

  const [loading,setLoading] = useState(true)
  const [apiKey,setApiKey] = useState('')
  const router = useRouter()

  useEffect(()=>{
    check()
  },[])

  const check = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if(!user){
      router.push('/login')
      return
    }

    // í´¥ API KEY VAR MI?
    const res = await fetch(`/api/dashboard?email=${user.email}`)
    const data = await res.json()

    if(data.keys?.length > 0){
      router.push('/dashboard')
      return
    }

    setLoading(false)
  }

  const createKey = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    const res = await fetch('/api/create-key',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email:user.email })
    })

    const json = await res.json()

    setApiKey(json.apiKey)
  }

  if(loading) return null

  return (
    <main className="container">

      <div className="card" style={{
        maxWidth:500,
        margin:"auto",
        marginTop:120,
        padding:30,
        textAlign:'center'
      }}>

        <h1>Welcome</h1>

        {!apiKey && (
          <>
            <p style={{opacity:0.7, marginTop:10}}>
              Create your first API key to start using OVWI
            </p>

            <button
              className="btn-primary"
              style={{marginTop:20}}
              onClick={createKey}
            >
              Create API Key
            </button>
          </>
        )}

        {apiKey && (
          <>
            <p style={{marginTop:20}}>Your API Key</p>

            <div style={{
              marginTop:10,
              padding:12,
              background:'#020617',
              borderRadius:8
            }}>
              {apiKey}
            </div>

            <button
              className="btn-primary"
              style={{marginTop:20}}
              onClick={()=>router.push('/dashboard')}
            >
              Go to Dashboard
            </button>
          </>
        )}

      </div>

    </main>
  )
}
