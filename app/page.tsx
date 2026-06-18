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
    <div className="min-h-screen bg-[#030712] text-slate-100">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center space-y-6">

        <h1 className="text-5xl md:text-6xl font-bold">
          Make money from your API
          <span className="block text-blue-400">
            in minutes
          </span>
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto">
          Track usage, enforce limits, and charge users automatically —
          no billing infrastructure required.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
            🚀 Start Free
          </Link>

          <Link href="/docs" className="border border-slate-700 px-6 py-3 rounded">
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

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-black/40 border border-slate-800"
          />

          <div className="w-full h-2 bg-slate-950 rounded">
            <div
              className={blocked ? "h-2 bg-red-500" : "h-2 bg-blue-500"}
              style={{ width: percent + "%" }}
            ></div>
          </div>

          <p className="text-xs text-slate-400 text-center">
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

      {/* TRUST */}
      <section className="text-center text-xs text-slate-500 border-y border-slate-900 py-6">
        Used by developers building monetized APIs

{/* TRUST_LAYER_SECTION */}
<div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale text-xs font-extrabold tracking-tight text-white">

  <span>▲ VERCEL</span>
  <span className="italic">linear</span>
  <span>supabase</span>
  <span>resend</span>

</div>

<p className="mt-4 text-[11px] text-slate-500 text-center">
Trusted by 1,200+ developers
</p>
      </section>

      {/* PROBLEM */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl font-bold mb-10">
          API monetization is broken
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-6 rounded">
            <h3 className="font-bold">Usage tracking</h3>
            <p className="text-sm text-slate-400 mt-2">
              Hard to build and maintain
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded">
            <h3 className="font-bold">Limits</h3>
            <p className="text-sm text-slate-400 mt-2">
              Break UX and systems
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded">
            <h3 className="font-bold">Billing</h3>
            <p className="text-sm text-slate-400 mt-2">
              Complex and time consuming
            </p>
          </div>

        </div>

      </section>

      {/* SOLUTION */}
      <section className="text-center max-w-3xl mx-auto px-6">

        <h2 className="text-3xl font-bold">
          OVWI handles it all automatically

{/* TESTIMONIAL_SECTION */}
<div className="mt-16 grid md:grid-cols-3 gap-6 text-left">

  <div className="bg-slate-900 border border-slate-800 p-5 rounded">
    <p className="text-sm text-slate-300">
      “We started charging for API access in less than a day.
      OVWI replaced weeks of backend work.”
    </p>
    <p className="text-xs text-slate-500 mt-3">
      — Indie SaaS founder
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-5 rounded">
    <p className="text-sm text-slate-300">
      “The usage tracking + limits just work.
      No edge cases, no headaches.”
    </p>
    <p className="text-xs text-slate-500 mt-3">
      — API developer
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-5 rounded">
    <p className="text-sm text-slate-300">
      “We plugged OVWI in front of our API and instantly had a business model.”
    </p>
    <p className="text-xs text-slate-500 mt-3">
      — Startup team
    </p>
  </div>

</div>
        </h2>

        <p className="text-slate-400 mt-4">
          Plug one endpoint and get tracking, limits and billing instantly.
        </p>

      </section>

      {/* HOW */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6">

        <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-400">

          <div>1. Connect API</div>
          <div>2. Track usage</div>
          <div>3. Charge users</div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center pb-20 space-y-6">

        <h2 className="text-3xl font-bold">
          Start monetizing your API today

{/* PRICING_SECTION */}
<div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">

  <div className="bg-slate-900 border border-slate-800 p-6 rounded">
    <h3 className="font-bold text-lg">Free</h3>
    <p className="text-slate-400 text-sm mt-2">For testing</p>

    <p className="text-3xl font-bold mt-4">$0</p>

    <ul className="text-sm text-slate-400 mt-4 space-y-2">
      <li>• 50 requests</li>
      <li>• Basic tracking</li>
    </ul>

    <button className="mt-6 w-full bg-slate-700 py-2 rounded text-sm">
      Get Started
    </button>
  </div>

  <div className="bg-slate-900 border border-blue-500 p-6 rounded relative">
    <span className="absolute top-2 right-2 text-xs text-blue-400">
      Popular
    </span>

    <h3 className="font-bold text-lg">Pro</h3>
    <p className="text-slate-400 text-sm mt-2">Best for startups</p>

    <p className="text-3xl font-bold mt-4">$9</p>

    <ul className="text-sm text-slate-400 mt-4 space-y-2">
      <li>• 10K requests</li>
      <li>• Full tracking</li>
      <li>• Limit enforcement</li>
      <li>• Billing integration</li>
    </ul>

    <button className="mt-6 w-full bg-blue-600 py-2 rounded text-sm">
      Upgrade
    </button>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-6 rounded">
    <h3 className="font-bold text-lg">Scale</h3>
    <p className="text-slate-400 text-sm mt-2">For heavy usage</p>

    <p className="text-3xl font-bold mt-4">$29</p>

    <ul className="text-sm text-slate-400 mt-4 space-y-2">
      <li>• Unlimited requests</li>
      <li>• Priority processing</li>
      <li>• Advanced billing</li>
    </ul>

    <button className="mt-6 w-full bg-slate-700 py-2 rounded text-sm">
      Contact
    </button>
  </div>

</div>
        </h2>

        <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
          🚀 Create Free Account
        </Link>

      </section>

    </div>
  );
}
