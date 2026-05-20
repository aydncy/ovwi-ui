'use client'

import { useEffect, useState } from 'react'
import { CHECKOUTS } from '@/lib/checkout'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    email: '',
    apiKey: '',
    usage: 0,
    remaining: 50,
    limit: 50,
    plan: 'free'
  })

  useEffect(() => {
    const loadUsage = async () => {
      try {
        const email =
          localStorage.getItem('ovwi_email') || ''

        const apiKey =
          localStorage.getItem('ovwi_api_key') || ''

        const res = await fetch('/api/usage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            apiKey
          })
        })

        const data = await res.json()

        if (data?.ok) {
          setStats({
            email,
            apiKey,
            usage: data.usage,
            remaining: data.remaining,
            limit: data.limit,
            plan: data.plan
          })
        }
      } catch (e) {
        console.error(e)
      }
    }

    loadUsage()
  }, [])

  const runVerification = async () => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: stats.email,
          apiKey: stats.apiKey,
          plan: stats.plan
        })
      })

      const data = await res.json()

      if (data?.ok) {
        setStats(prev => ({
          ...prev,
          usage: data.usage,
          remaining: data.remaining,
          limit: data.limit,
          plan: data.plan
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,180,0.12),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-14">

        <div className="flex items-center justify-between mb-14">

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-sm mb-5">
              LIVE SYSTEM
            </div>

            <h1 className="text-6xl font-black tracking-tight">
              OVWI
            </h1>

            <p className="text-zinc-400 text-xl mt-3">
              Enterprise Verification Dashboard
            </p>
          </div>

          <button
            onClick={() => window.location.href = CHECKOUTS.pro}
            className="rounded-2xl px-8 py-4 bg-white text-black font-bold hover:scale-105 transition-all"
          >
            Upgrade Plan
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-zinc-400 text-sm mb-3">
              Remaining Credits
            </div>

            <div className="text-6xl font-black">
              {stats.remaining}
            </div>

            <div className="mt-5 h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400"
                style={{
                  width: `${(stats.remaining / stats.limit) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-zinc-400 text-sm mb-3">
              Total Usage
            </div>

            <div className="text-6xl font-black">
              {stats.usage}
            </div>

            <div className="mt-6 text-emerald-300 text-sm">
              Real persistent sync active
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-zinc-400 text-sm mb-3">
              Active Plan
            </div>

            <div className="text-5xl font-black uppercase">
              {stats.plan}
            </div>

            <div className="mt-6 text-zinc-400 text-sm">
              Limit: {stats.limit}
            </div>
          </div>

        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div>
              <h2 className="text-3xl font-bold">
                Verification Engine
              </h2>

              <p className="text-zinc-400 mt-2">
                Real-time AI verification pipeline
              </p>
            </div>

            <button
              onClick={runVerification}
              className="rounded-2xl px-10 py-5 bg-emerald-400 text-black font-black text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(74,222,128,0.4)]"
            >
              Run Verification
            </button>

          </div>

        </div>

      </div>
    </main>
  )
}
