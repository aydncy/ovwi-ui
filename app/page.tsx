'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const limit = 50;

  const percent = Math.min((usage / limit) * 100, 100);
  const blocked = usage >= limit;

  function runRequest() {
    if (!email) return alert('Enter email');
    if (blocked) return;

    setUsage((u) => u + 10);
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/10 blur-3xl rounded-full" />

      {/* NAV */}
      <nav className="relative border-b border-slate-900">
        <div className="max-w-6xl mx-auto flex justify-between px-6 py-4 text-sm">
          <span className="font-bold text-white">OVWI</span>

          <div className="flex gap-6 text-slate-400">
            <Link href="/">Home</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-24 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Turn your API into
            <span className="block text-blue-400">
              a revenue engine
            </span>
          </h1>

          <p className="text-slate-400 max-w-md">
            Track usage, enforce limits and automatically charge users —
            no billing infrastructure required.
          </p>

          <div className="flex gap-4">
            <Link href="/auth/login" className="bg-white text-black px-4 py-2 rounded">
              🚀 Start Free
            </Link>

            <Link href="/docs" className="border border-slate-700 px-4 py-2 rounded">
              Docs
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            No infra • No billing code • 50 free requests
          </p>

        </div>

        {/* DEMO */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 shadow-2xl">

          <p className="text-xs text-slate-400 font-mono">
            Live Monetization Demo
          </p>

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-black/50 border border-slate-800 rounded"
          />

          <div className="w-full bg-slate-950 h-2 rounded overflow-hidden">
            <div
              className={`h-2 transition-all ${
                blocked
                  ? 'bg-gradient-to-r from-red-500 to-rose-600'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-slate-400">
            {usage} / {limit} requests
          </p>

          {!blocked ? (
            <button
              onClick={runRequest}
              className="w-full bg-blue-600 py-2 rounded"
            >
              Run API Request
            </button>
          ) : (
            <button className="w-full bg-green-600 py-2 rounded animate-pulse">
              🚀 Upgrade to continue
            </button>
          )}

        </div>

      </section>

    </div>
  );
}