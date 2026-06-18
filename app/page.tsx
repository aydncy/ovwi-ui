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
    if (!email) return alert("Enter email");
    if (blocked) return;
    setUsage(u => u + 10);
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">

      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center px-6 pt-24 pb-16 space-y-6">
        <h1 className="text-5xl font-bold">
          Make money from your API
          <span className="block text-blue-400">in minutes</span>
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto">
          Track usage, enforce limits, and charge users automatically.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/auth/login" className="bg-blue-600 px-4 py-2 rounded">
            🚀 Start Free
          </Link>

          <Link href="/docs" className="border border-white/20 px-4 py-2 rounded">
            Docs
          </Link>
        </div>
      </section>

      {/* DEMO */}
      <section className="max-w-xl mx-auto px-6 pb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">

          <p className="text-sm text-slate-400 text-center">
            Live Monetization Demo
          </p>

          <p className="text-xs text-yellow-400 text-center">
            ⚠️ Free users hit limits quickly → upgrade required
          </p>

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-2 bg-black/40 border border-slate-800 rounded"
          />

          <div className="w-full h-2 bg-slate-950 rounded">
            <div
              className={blocked ? "h-2 bg-red-500" : "h-2 bg-blue-500"}
              style={{ width: percent + "%" }}
            />
          </div>

          <p className="text-xs text-slate-400 text-center">
            {usage} / {limit} requests
          </p>

          {!blocked ? (
            <button onClick={runRequest} className="w-full bg-blue-600 py-2 rounded">
              Run API Request
            </button>
          ) : (
            <button className="w-full bg-green-600 py-2 rounded animate-pulse">
              🚀 Upgrade to continue
            </button>
          )}
        </div>
      </section>

      {/* TRUST */}
      <section className="text-center border-y border-slate-900 py-6 text-xs text-slate-500">
        Used by developers building monetized APIs

        <div className="mt-4 flex justify-center gap-6 opacity-30">
          <span>▲ VERCEL</span>
          <span>linear</span>
          <span>supabase</span>
          <span>resend</span>
        </div>

        <p className="mt-2 text-[11px]">Trusted by 1200+ developers</p>
      </section>

      {/* PROBLEM */}
      <section className="max-w-5xl mx-auto text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-10">
          API monetization is broken
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded">
            Usage tracking is complex
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded">
            Limits break systems
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded">
            Billing is painful
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-5xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded text-sm">
          “We monetized our API in one day.”
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded text-sm">
          “No billing edge cases anymore.”
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded text-sm">
          “This replaced weeks of work.”
        </div>

      </section>

      {/* PRICING */}
      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded">
          <h3 className="font-bold">Free</h3>
          <p className="mt-2">$0</p>
        </div>

        <div className="bg-slate-900 border border-blue-500 p-6 rounded">
          <h3 className="font-bold">Pro</h3>
          <p className="mt-2">$9</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded">
          <h3 className="font-bold">Scale</h3>
          <p className="mt-2">$29</p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center pb-24">
        <h2 className="text-3xl font-bold mb-4">
          Start making money from your API
        </h2>

        <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
          🚀 Create Free Account
        </Link>
      </section>

    </div>
  );
}
