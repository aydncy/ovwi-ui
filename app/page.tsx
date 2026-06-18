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
    if (!email) return;

    if (blocked) return;

    setLoading(true);

    setTimeout(() => {
      const newUsage = usage + 5;
      setUsage(newUsage);
      setLoading(false);

      if (newUsage >= limit) {
        setBlocked(true);
      }
    }, 600);
  }

  return (
    <div className="space-y-32">

      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-24 items-center">

        <div className="space-y-6">

          <h1 className="text-6xl font-bold leading-tight">
            Monetize your API
            <span className="block text-blue-400">
              without building infrastructure
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            Usage tracking, limits, and billing — built in.
          </p>

          <div className="flex gap-4">

            /auth/login
              🚀 Start Free
            </Link>

            /docs
              Docs
            </Link>

          </div>

          <p className="text-xs text-gray-500">
            Free plan includes 50 requests
          </p>

        </div>

        {/* LIVE DEMO */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">

          <p className="text-sm text-gray-400">
            Try it live
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
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Run API Request
            </button>
          )}

          {blocked && (
            <button
              className="bg-green-600 px-4 py-2 rounded animate-pulse"
            >
              🚀 Upgrade Now
            </button>
          )}

        </div>

      </section>

      {/* TRUST */}
      <section className="text-center text-gray-500">
        Used by developers building production-ready APIs
      </section>

      {/* PROBLEM */}
      <section className="max-w-4xl mx-auto text-center space-y-6 px-6">

        <h2 className="text-3xl font-bold">
          Building APIs is easy.
          Monetizing them isn’t.
        </h2>

        <p className="text-gray-400">
          Tracking usage, enforcing limits, and charging users
          usually requires building complex infrastructure.
        </p>

      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        <div className="card">
          <h3 className="font-bold">Usage Tracking</h3>
          <p className="text-gray-400 mt-2">
            Monitor every request
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Limits</h3>
          <p className="text-gray-400 mt-2">
            Stop abuse automatically
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Monetization</h3>
          <p className="text-gray-400 mt-2">
            Charge based on usage
          </p>
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto text-center space-y-10 px-6">

        <h2 className="text-3xl font-bold">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-400">

          <div>1. Connect your API</div>
          <div>2. Track usage</div>
          <div>3. Set limits & charge users</div>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center space-y-6">

        <h2 className="text-4xl font-bold">
          Start making money from your API
        </h2>

        /auth/login
          Create Free Account
        </Link>

      </section>

    </div>
  );
}
