'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/useAuth';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);

  const [flowUsage, setFlowUsage] = useState(0);

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

  // ✅ FLOW ANIMATION
  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      setFlowUsage(val);

      if (val >= 50) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const percent = (usage / limit) * 100;
  const flowPercent = (flowUsage / 50) * 100;

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

            {user ? (
              <Link href="/dashboard" className="bg-blue-600 px-6 py-3   </Link>
            ) : (
              <Link href="/auth/login" className="bg-blue-600 px-6 py-3/Link>
            )}

            <Link href="/docs" className="border border-white/20 px-6 py-3 rounded  </div>

        {/* REAL PANEL */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">

          <p className="text-sm text-gray-400">Your Usage</p>

          <div className="w-full h-3 bg-gray-800 rounded mt-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {usage} / {limit}
          </p>

        </div>

      </section>

      {/* HOW IT WORKS (FLOW DEMO) */}
      <section className="max-w-xl mx-auto text-center space-y-6">

        <h2 className="text-3xl font-bold">How it works</h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">

          <div className="w-full bg-gray-800 h-3 rounded mb-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
              style={{ width: `${flowPercent}%`, transition: 'all 0.4s' }}
            />
          </div>

          <p className="text-xs text-gray-400">
            {flowUsage < 40 && `${flowUsage} / 50 requests`}
            {flowUsage >= 40 && flowUsage < 50 && "⚠️ Approaching limit"}
            {flowUsage >= 50 && "🚨 Limit reached"}
          </p>

          {flowUsage >= 50 && (
            <button className="mt-4 bg-green-600 px-4 py-2 rounded animate-pulse">
              Upgrade
            </button>
          )}

        </div>

      </section>

    </div>
  );
}
