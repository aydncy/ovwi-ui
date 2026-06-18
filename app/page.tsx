'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const limit = 50;
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const percent = (usage / limit) * 100;

  function runRequest() {
    if (!email) return alert("Enter email");

    if (blocked) return;

    setLoading(true);

    setTimeout(() => {
      const newUsage = usage + 5;
      setUsage(newUsage);
      setLoading(false);

      if (newUsage >= limit) setBlocked(true);
    }, 500);
  }

  return (
    <div className="space-y-24">

      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20 items-center">

        <div className="space-y-6">

          <h1 className="text-6xl font-bold leading-tight">
            Make money from your API
            <span className="block text-blue-400">
              in minutes
            </span>
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

          <p className="text-xs text-gray-500">
            No infrastructure needed • 50 free requests
          </p>

        </div>

        {/* LIVE DEMO */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">

          <p className="text-sm text-gray-400">
            Live Monetization Demo
          </p>

          <p className="text-xs text-gray-500">
            This is how users hit limits and upgrade
          </p>

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-black/50 border border-white/10"
          />

          <div className="w-full bg-gray-800 h-3 rounded">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-gray-400">
            {usage} / {limit}
          </p>

          {loading && (
            <p className="text-blue-400 text-xs">Running request...</p>
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
            <button className="bg-green-600 px-4 py-2 rounded text-sm animate-pulse">
              🚀 Upgrade Now
            </button>
          )}

        </div>

      </section>

      {/* TRUST */}
      <section className="text-center text-gray-500">
        Used by developers building production APIs
      </section>

      {/* PROBLEM */}
      <section className="max-w-4xl mx-auto text-center space-y-6 px-6">

        <h2 className="text-3xl font-bold">
          Building APIs is easy. Monetizing them isn’t.
        </h2>

        <p className="text-gray-400">
          Usage tracking, rate limits and billing systems take weeks to build.
          OVWI gives you everything instantly.
        </p>

      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        <div className="card">
          <h3 className="font-bold">Track Every Request</h3>
          <p className="text-gray-400 mt-2">
            Real-time API usage tracking
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Limit & Control</h3>
          <p className="text-gray-400 mt-2">
            Block users automatically when limits are reached
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Monetize Instantly</h3>
          <p className="text-gray-400 mt-2">
            Turn usage into revenue
          </p>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto text-center space-y-8 px-6">

        <h2 className="text-3xl font-bold">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-400 text-sm">
          <div>1. Connect your API</div>
          <div>2. Track usage automatically</div>
          <div>3. Set limits & charge users</div>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center space-y-6 pb-20">

        <h2 className="text-4xl font-bold">
          Start making money from your API
        </h2>

        <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
          🚀 Create Free Account
        </Link>

      </section>

    </div>
  );
}
