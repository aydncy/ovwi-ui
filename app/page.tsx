'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const limit = 50;
  const [blocked, setBlocked] = useState(false);

  const percent = Math.min((usage / limit) * 100, 100);

  function runRequest() {
    if (!email) return alert("Enter email");

    if (blocked) return;

    const next = usage + 10;
    setUsage(next);

    if (next >= limit) setBlocked(true);
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent)] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between px-6 py-4 text-sm">
          <span className="font-bold">OVWI</span>

          <div className="flex gap-6 text-gray-400">
            <Link href="/">Home</Link>
            <Link href="/docs">Docs</Link>
            <Link href="/auth/login">Login</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-24 items-center">

        {/* TEXT */}
        <div className="space-y-6">

          <h1 className="text-5xl font-bold leading-tight">
            Make money from your API
            <span className="block text-blue-400">in minutes</span>
          </h1>

          <p className="text-gray-400">
            Track usage, enforce limits and charge users automatically.
          </p>

          <div className="flex gap-4">
            <Link href="/auth/login" className="bg-blue-600 px-5 py-2 rounded">
              🚀 Start Free
            </Link>

            <Link href="/docs" className="border border-white/20 px-5 py-2 rounded">
              Docs
            </Link>
          </div>

        </div>

        {/* DEMO */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">

          <p className="text-sm text-gray-400">
            Live Monetization Demo
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

          {!blocked ? (
            <button
              onClick={runRequest}
              className="bg-blue-600 px-4 py-2 rounded"
            >
              Run Request
            </button>
          ) : (
            <button className="bg-green-600 px-4 py-2 rounded animate-pulse">
              🚀 Upgrade
            </button>
          )}

        </div>

      </section>

      {/* TRUST */}
      <section className="text-center text-gray-500">
        Used by developers building production APIs
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 py-20">

        {[
          "Track every request",
          "Block users at limits",
          "Monetize instantly"
        ].map((item) => (
          <div key={item} className="bg-white/5 p-4 rounded border border-white/10">
            {item}
          </div>
        ))}

      </section>

      {/* CTA */}
      <section className="text-center pb-20">

        <h2 className="text-3xl font-bold mb-4">
          Start earning from your API
        </h2>

        <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
          Create Free Account
        </Link>

      </section>

    </div>
  );
}
