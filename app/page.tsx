'use client';

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {

  const [usage, setUsage] = useState(0);
  const limit = 50;
  const percent = Math.min((usage / limit) * 100, 100);
  const blocked = usage >= limit;

  function runRequest() {
    if (blocked) return;
    setUsage(u => u + 10);
  }

  return (
    <div className="bg-[#030303] text-white min-h-screen selection:bg-cyan-500/30">

      <Navbar />

      <main className="relative">

        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
        </div>

        {/* HERO */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 text-center">

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Make money from your API
            <span className="block text-cyan-400">
              in minutes
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-slate-400 mb-8">
            Track usage, enforce limits and charge users automatically.
          </p>

          <div className="flex justify-center gap-3">
            <Link href="/auth/login" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 transition">
              🚀 Start Free
            </Link>

            <Link href="/docs" className="border border-white/10 px-6 py-2 rounded-full text-sm hover:bg-white/10">
              Docs
            </Link>
          </div>

        </section>

        {/* DEMO CARD */}
        <section className="relative z-10 flex justify-center mt-10 pb-16">

          <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl">

            <p className="text-center text-sm text-slate-400">
              Live Monetization Demo
            </p>

            <p className="text-center text-xs text-yellow-400 mt-1">
              ⚠️ Free users hit limits — upgrade required
            </p>

            <div className="mt-4">

              <div className="w-full bg-slate-900 h-2 rounded">
                <div
                  className={blocked ? "h-2 bg-red-500" : "h-2 bg-cyan-500"}
                  style={{ width: percent + "%" }}
                />
              </div>

              <p className="text-xs text-center text-slate-400 mt-2">
                {usage} / {limit} requests
              </p>

            </div>

            {!blocked ? (
              <button
                onClick={runRequest}
                className="mt-4 w-full bg-cyan-600 py-2 rounded-lg hover:bg-cyan-500 transition"
              >
                Run API Request
              </button>
            ) : (
              <button className="mt-4 w-full bg-green-600 py-2 rounded-lg animate-pulse">
                🚀 Upgrade to continue
              </button>
            )}

          </div>

        </section>

        {/* TRUST */}
        <section className="border-y border-white/5 py-10 text-center text-xs text-slate-500">

          Trusted by developers worldwide

          <div className="mt-4 flex justify-center gap-8 opacity-30">
            <span>▲ VERCEL</span>
            <span>linear</span>
            <span>supabase</span>
            <span>resend</span>
          </div>

        </section>

        {/* PROBLEM */}
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl font-bold mb-10">
            API monetization is broken
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-400">

            <div className="bg-white/5 border border-white/10 p-4 rounded">
              Usage tracking is complex
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded">
              Limits break systems
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded">
              Billing is painful
            </div>

          </div>

        </section>

        {/* PRICING */}
        <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">

          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded">
            <h3 className="font-bold">Free</h3>
            <p className="mt-2 text-2xl">$0</p>
          </div>

          <div className="bg-[#0A0A0A] border border-cyan-500 p-6 rounded">
            <h3 className="font-bold">Pro</h3>
            <p className="mt-2 text-2xl">$9</p>
          </div>

          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded">
            <h3 className="font-bold">Scale</h3>
            <p className="mt-2 text-2xl">$29</p>
          </div>

        </section>

        {/* CTA */}
        <section className="text-center pb-24">

          <h2 className="text-3xl font-bold mb-6">
            Start making money from your API
          </h2>

          <Link href="/auth/login" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-cyan-400 transition">
            🚀 Create Free Account
          </Link>

        </section>

      </main>
    </div>
  );
}
