'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const percent = (usage / limit) * 100;

  async function runRequest() {
    if (!email) return alert('Enter email');

    if (blocked) return;

    setLoading(true);

    setTimeout(() => {
      const newUsage = usage + 5;

      setUsage(newUsage);
      setLoading(false);

      if (newUsage >= limit) {
        setBlocked(true);
      }
    }, 800);
  }

  return (
    <div className="space-y-32">

      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-28 items-center">

        <div className="space-y-6">

          <h1 className="text-6xl font-bold">
            Monetize your API
            <span className="block text-blue-400">in minutes</span>
          </h1>

          <p className="text-gray-400 text-lg">
            Track usage, enforce limits, and charge users automatically.
          </p>

          <div className="flex gap-4">

            <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
              🚀 Start Free
            </Link>

            <Link href="/docs" className="border border-white/20 px-6 py-3 rounded">
              Docs
            </Link>

          </div>

        </div>

        {/* LIVE DEMO */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">

          <p className="text-sm text-gray-400">Live Demo</p>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-2 rounded bg-black/50 border border-white/10 text-sm"
          />

          <div className="w-full h-3 bg-gray-800 rounded overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-gray-400">
            {usage} / {limit}
          </p>

          {loading && (
            <p className="text-blue-400 text-xs">
              Running request...
            </p>
          )}

          {usage > 40 && !blocked && (
            <p className="text-yellow-400 text-xs">
              ⚠️ Approaching limit
            </p>
          )}

          {blocked && (
            <p className="text-red-400 text-xs">
              🚨 Limit reached — upgrade required
            </p>
          )}

          {!blocked && (
            <button
              onClick={runRequest}
              className="bg-blue-600 px-4 py-2 rounded text-sm"
            >
              Run API Request
            </button>
          )}

          {blocked && (
            <button
              onClick={() => window.location.href='https://aydncy.gumroad.com/l/ovwi_pro'}
              className="bg-green-600 px-4 py-2 rounded text-sm animate-pulse"
            >
              🚀 Upgrade Now
            </button>
          )}

        </div>

      </section>

{/* SALES_SECTIONS */}

{/* SOCIAL PROOF */}
<section className="text-center text-gray-500 mt-10">
  Used by developers building production-ready APIs
</section>

{/* PROBLEM */}
<section className="max-w-4xl mx-auto text-center mt-24 space-y-6 px-6">
  <h2 className="text-3xl font-bold">
    Building APIs is easy. Monetizing them isn’t.
  </h2>
  <p className="text-gray-400">
    Tracking usage, enforcing limits, and charging users is complex.
    OVWI solves this instantly.
  </p>
</section>

{/* FEATURES */}
<section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-16 px-6">

  <div className="card">
    <h3 className="font-bold">Automatic Usage Tracking</h3>
    <p className="text-gray-400 mt-2">
      Every API request is tracked in real time.
    </p>
  </div>

  <div className="card">
    <h3 className="font-bold">Built-in Limits</h3>
    <p className="text-gray-400 mt-2">
      Stop overuse automatically.
    </p>
  </div>

  <div className="card">
    <h3 className="font-bold">Instant Monetization</h3>
    <p className="text-gray-400 mt-2">
      Turn API traffic into revenue.
    </p>
  </div>

</section>

{/* HOW DEMO EXPLAIN */}
<section className="max-w-4xl mx-auto text-center mt-24 space-y-6 px-6">
  <h2 className="text-3xl font-bold">
    What you just saw
  </h2>

  <p className="text-gray-400">
    Each click simulated a real API request.
    When limits are reached — access is blocked.
    Users must upgrade to continue.
  </p>
</section>

{/* FINAL CTA */}
<section className="text-center mt-24 mb-20">

  <h2 className="text-4xl font-bold mb-6">
    Start monetizing your API today
  </h2>

  <a href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
    Create Free Account
  </a>

</section>

    </div>
  );
}
