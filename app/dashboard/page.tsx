'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-browser'
import { CHECKOUTS } from '@/lib/checkout'

export default function DashboardPage() {
  const [stats, setStats] = useState<any>({
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
          setStats((prev:any) => ({
            ...prev,
            email,
            apiKey,
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
        setStats((prev:any) => ({
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
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              OVWI Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Real persistent usage system
            </p>
          </div>

          <button
            onClick={() => window.location.href = CHECKOUTS.pro}
            className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Upgrade
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-zinc-400 text-sm mb-2">
              Remaining
            </div>

            <div className="text-5xl font-bold">
              {stats.remaining}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-zinc-400 text-sm mb-2">
              Usage
            </div>

            <div className="text-5xl font-bold">
              {stats.usage}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-zinc-400 text-sm mb-2">
              Plan
            </div>

            <div className="text-5xl font-bold uppercase">
              {stats.plan}
            </div>
          </div>

        </div>

        <div className="mt-10">
          <button
            onClick={runVerification}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Run Verification
          </button>
        </div>

      </div>
    </main>
  )
}
