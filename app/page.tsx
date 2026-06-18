'use client';

import { useAuth } from '@/components/useAuth';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    async function load() {
      if (!user) {
        setUsage(0);
        setLimit(50);
        return;
      }

      const res = await fetch('/api/verify', {
        method: 'POST',
        body: JSON.stringify({ email: user.email })
      });

      const data = await res.json();
      setUsage(data.usage);
      setLimit(data.limit);
    }

    load();
  }, [user]);

  const percent = (usage / limit) * 100;

  return (
    <div className="space-y-32">

      {/* 1️⃣ HERO (NE SATIYORSUN) */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-28 items-center">

        <div className="space-y-6">

          <h1 className="text-6xl font-bold">
            Monetize your API
            <span className="block text-blue-400">
              in minutes
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            OVWI lets you track usage, enforce limits, and charge users — without building infrastructure.
          </p>

          <div className="flex gap-4">

            <Link
              href={user ? '/dashboard' : '/auth/login'}
              className="bg-blue-600 px-6 py-3 rounded-lg font-medium"
            >
              🚀 Start Free
            </Link>

            <Link
              href="/docs"
              className="border border-white/20 px-6 py-3 rounded-lg"
            >
              Docs
            </Link>

          </div>

          <p className="text-xs text-gray-500">
            Free plan includes 50 requests
          </p>

        </div>

        {/* REAL PREVIEW */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">

          <p className="text-sm text-gray-400">Usage</p>

          <div className="w-full h-3 bg-gray-800 rounded mt-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {usage} / {limit} requests
          </p>

          <button className="bg-green-600 px-4 py-2 rounded mt-4">
            Upgrade
          </button>

        </div>

      </section>

      {/* 2️⃣ PROBLEM (neden lazım) */}
      <section className="max-w-5xl mx-auto text-center space-y-6 px-6">

        <h2 className="text-3xl font-bold">
          Building APIs is easy. Monetizing them isn’t.
        </h2>

        <p className="text-gray-400">
          Most developers build APIs but struggle with usage tracking, limits, and billing.
        </p>

      </section>

      {/* 3️⃣ SOLUTION */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        <div className="card">
          <h3 className="font-bold">Track Usage</h3>
          <p className="text-gray-400 mt-2">
            Monitor every API call in real time.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Enforce Limits</h3>
          <p className="text-gray-400 mt-2">
            Automatically block usage when limits are reached.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Charge Users</h3>
          <p className="text-gray-400 mt-2">
            Turn API traffic into revenue instantly.
          </p>
        </div>

      </section>

      {/* 4️⃣ HOW IT WORKS */}
      <section className="max-w-5xl mx-auto text-center space-y-10 px-6">

        <h2 className="text-3xl font-bold">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-400">

          <div>
            1. Connect your API
          </div>

          <div>
            2. Track usage automatically
          </div>

          <div>
            3. Set limits & monetize
          </div>

        </div>

      </section>

      {/* 5️⃣ CTA */}
      <section className="text-center space-y-6">

        <h2 className="text-4xl font-bold">
          Start monetizing today
        </h2>

        <Link
          href={user ? '/dashboard' : '/auth/login'}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Create Free Account
        </Link>

      </section>

    </div>
  );
}
