'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const limit = 50;
  const percent = Math.min((usage / limit) * 100, 100);
  const blocked = usage >= limit;

  function runRequest() {
    if (!email) return alert("Enter email");
    if (blocked) return;
    setUsage((u) => u + 10);
  }

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* HERO */}
      <section className="relative text-center pt-24 space-y-6">

        <h1 className="text-5xl font-bold leading-tight">
          Make money from your API
          <span className="block text-blue-400">
            in minutes
          </span>
        </h1>

        <p className="text-slate-400">
          Track usage, enforce limits, and charge users automatically.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/auth/login" className="bg-blue-600 px-4 py-2 rounded">
            🚀 Start Free
          </Link>

          <Link href="/docs" className="border border-slate-700 px-4 py-2 rounded">
            Docs
          </Link>
        </div>

      </section>

      {/* PARALLAX CARD */}
      <section className="flex justify-center mt-16">

        <div
          className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-xl transition"
          style={{
            transform: `rotateX(${mouse.y * -10}deg) rotateY(${mouse.x * 10}deg)`
          }}
        >

          <p className="text-sm text-slate-400 text-center">
            Live Monetization Demo
          </p>

          <p className="text-xs text-yellow-400 text-center mt-1">
            ⚠️ Free users hit limits — upgrade required
          </p>

          <input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-black/40 border border-slate-800 rounded mt-4"
          />

          <div className="w-full bg-slate-950 h-2 rounded mt-4">
            <div
              className={blocked ? "h-2 bg-red-500" : "h-2 bg-blue-500"}
              style={{ width: percent + "%" }}
            />
          </div>

          <p className="text-xs text-slate-400 text-center mt-2">
            {usage} / {limit} requests
          </p>

          {!blocked ? (
            <button
              onClick={runRequest}
              className="mt-4 w-full bg-blue-600 py-2 rounded"
            >
              Run API Request
            </button>
          ) : (
            <button className="mt-4 w-full bg-green-600 py-2 rounded animate-pulse">
              🚀 Upgrade
            </button>
          )}

        </div>

      </section>

      {/* TRUST */}
      <section className="text-center border-y border-slate-900 py-8 mt-16 text-xs text-slate-500">
        Trusted by developers worldwide

        <div className="mt-4 flex justify-center gap-6 opacity-30 text-white">
          <span>▲ VERCEL</span>
          <span>linear</span>
          <span>supabase</span>
          <span>resend</span>
        </div>

      </section>

      {/* PROBLEM */}
      <section className="text-center mt-20 space-y-10">

        <h2 className="text-3xl font-bold">
          API monetization is broken
        </h2>

        <div className="flex justify-center gap-6 flex-wrap text-sm text-slate-400">
          <div className="bg-slate-900 p-4 rounded border border-slate-800">Usage tracking is complex</div>
          <div className="bg-slate-900 p-4 rounded border border-slate-800">Limits break systems</div>
          <div className="bg-slate-900 p-4 rounded border border-slate-800">Billing is painful</div>
        </div>

      </section>

      {/* PRICING */}
      <section className="flex justify-center gap-6 mt-16 flex-wrap">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded w-56">
          <h3 className="font-bold">Free</h3>
          <p className="mt-2">$0</p>
        </div>

        <div className="bg-slate-900 border border-blue-500 p-6 rounded w-56">
          <h3 className="font-bold">Pro</h3>
          <p className="mt-2">$9</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded w-56">
          <h3 className="font-bold">Scale</h3>
          <p className="mt-2">$29</p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center mt-20 pb-24">

        <h2 className="text-3xl font-bold mb-6">
          Start making money from your API
        </h2>

        <Link href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
          🚀 Create Free Account
        </Link>

      </section>

    </div>
  );
}
