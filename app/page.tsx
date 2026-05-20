'use client'

import { useState } from 'react'
import { CHECKOUTS } from '@/lib/checkout'

export default function HomePage() {
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState<any>(null)

  const runVerify = async () => {
    if(!email) return

    setLoading(true)

    try{
      const res = await fetch('/api/verify',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email
        })
      })

      const data = await res.json()

      setResult(data)

      if(data?.apiKey){
        localStorage.setItem('ovwi_email',email)
        localStorage.setItem('ovwi_api_key',data.apiKey)
      }

    }catch(e){
      console.error(e)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="max-w-4xl">

          <div className="inline-flex px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-8">
            AI Verification Platform
          </div>

          <h1 className="text-7xl font-black leading-none">
            Verify Emails
            <br />
            With AI Intelligence
          </h1>

          <p className="text-zinc-400 text-xl mt-8 max-w-2xl">
            Enterprise-grade verification infrastructure with persistent usage tracking.
          </p>

          <div className="flex gap-4 mt-10">

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter email..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-lg"
            />

            <button
              onClick={runVerify}
              className="bg-emerald-400 text-black px-10 rounded-2xl font-black text-lg"
            >
              {loading ? 'Running...' : 'Verify'}
            </button>

          </div>

          {result && (
            <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 overflow-auto">
              <pre className="text-sm text-emerald-300">
                {JSON.stringify(result,null,2)}
              </pre>
            </div>
          )}

          <div className="flex gap-4 mt-10">

            <button
              onClick={()=>window.location.href='/dashboard'}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold"
            >
              Dashboard
            </button>

            <button
              onClick={()=>window.location.href=CHECKOUTS.pro}
              className="bg-zinc-900 border border-zinc-700 px-8 py-4 rounded-2xl font-bold"
            >
              Upgrade
            </button>

          </div>

        </div>

      </section>

    </main>
  )
}
