'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const limit = 50;

  const percent = (usage / limit) * 100;
  const blocked = usage >= limit;

  function runRequest() {
    if (!email) return alert("Enter email");
    if (blocked) return;
    setUsage((u) => u + 10);
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-3xl rounded-full animate-pulse" />

      {/* HERO TEXT */}
      <section className="relative max-w-4xl mx-auto text-center px-6 pt-28 pb-10 space-y-6">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Make money from your API
          <span className="block text-blue-400">
            in minutes
          </span>
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto">
          Track usage, enforce limits and charge users automatically.
        </p>

        <div className="flex justify-center gap-4">

          <Link href="/auth/login">
  🚀 Start Free
</Link>

          <Link href="/docs">
  Docs
</Link>

        </div>

      </section>

      {/* CENTER STACK WITH ANIMATION */}
      <section className="relative flex justify-center pb-24">

        <div className="relative w-full max-w-4xl">

          {/* BACK CARD */}
          <div className="absolute inset-0 translate-y-6 scale-95 bg-slate-900 border border-slate-800 rounded-xl opacity-40 animate-[float_6s_ease-in-out_infinite]" />

          {/* MID CARD */}
          <div className="absolute inset-0 translate-y-3 scale-97 bg-slate-900 border border-slate-800 rounded-xl opacity-60 animate-[float_5s_ease-in-out_infinite]" />

          {/* MAIN CARD */}
          <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-4 shadow-2xl animate-[float_4s_ease-in-out_infinite]">

            <p className="text-sm text-slate-400 text-center">
              Live Monetization Demo
            </p>

            <p className="text-xs text-yellow-400 text-center">
              ⚠️ Users hit limits and upgrade
            </p>

            <input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-black/40 border border-slate-800 rounded"
            />

            <div className="w-full bg-slate-950 h-2 rounded">
              <div
                className={`h-2 transition-all ${
                  blocked
                    ? 'bg-gradient-to-r from-red-500 to-rose-600'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="text-xs text-slate-400 text-center">
              {usage} / {limit} requests
            </p>

            {!blocked ? (
              <button
                onClick={runRequest}
                className="w-full bg-blue-600 py-2 rounded text-sm hover:scale-[1.02] transition"
              >
                Run API Request
              </button>
            ) : (
              <button className="w-full bg-green-600 py-2 rounded text-sm animate-pulse">
                🚀 Upgrade to continue
              </button>
            )}

          </div>

        </div>

      </section>

      {/* TRUST */}
      <section className="text-center border-y border-slate-900 py-6 text-xs text-slate-500">

        Trusted by developers building monetized APIs

        <div className="mt-4 flex justify-center gap-6 opacity-30 text-white">
          <span>▲ VERCEL</span>
          <span>linear</span>
          <span>supabase</span>
          <span>resend</span>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-20">

        <h2 className="text-3xl font-bold mb-6">
          Start monetizing your API
        </h2>

        /auth/login
          🚀 Create Free Account
        </Link>

      </section>

      {/* KEYFRAMES */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

    </div>
  );
}
