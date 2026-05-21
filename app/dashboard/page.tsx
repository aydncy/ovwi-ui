'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-browser'

export default function DashboardPage() {

  const [loading,setLoading] = useState(false)

  const [stats,setStats] = useState({
    remaining:0,
    usage:0,
    total:50
  })

  async function loadUsage() {

    const {
      data:{ user }
    } = await supabase.auth.getUser()

    if(!user?.email) return

    const res = await fetch('/api/usage?email=' + user.email)
    const data = await res.json()

    if(data?.ok){
      setStats({
        remaining:data.remaining,
        usage:data.usage,
        total:data.total
      })
    }
  }

  useEffect(()=>{
    loadUsage()
  },[])

  async function runVerification(){

    setLoading(true)

    const {
      data:{ user }
    } = await supabase.auth.getUser()

    if(!user?.email){
      alert('Login required')
      setLoading(false)
      return
    }

    const res = await fetch('/api/verify',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:user.email
      })
    })

    const data = await res.json()

    if(data?.ok){
      await loadUsage()
    }else{
      alert(data?.error || 'Verification failed')
    }

    setLoading(false)
  }

  return (
    <main className="page-wrap">
      <div className="hero-glow"></div>

      <div className="glass dashboard-card mb-8">
        <h1 className="text-5xl font-black gradient-text">
          OVWI Dashboard
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          Premium Verification Intelligence Platform
        </p>
      </div>

      <div className="dashboard-grid">

        <div className="glass dashboard-card">
          <div className="text-slate-400">
            Remaining Credits
          </div>

          <div className="stat-number gradient-text">
            {stats.remaining}
          </div>
        </div>

        <div className="glass dashboard-card">
          <div className="text-slate-400">
            Used Credits
          </div>

          <div className="stat-number">
            {stats.usage}
          </div>
        </div>

        <div className="glass dashboard-card">
          <div className="text-slate-400">
            Total Credits
          </div>

          <div className="stat-number">
            {stats.total}
          </div>
        </div>

      </div>

      <div className="glass dashboard-card mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Run Verification
        </h2>

        <button
          onClick={runVerification}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? 'Running...' : 'Run Verification'}
        </button>

      </div>
    </main>
  )
}
