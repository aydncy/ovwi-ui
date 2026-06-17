'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/useAuth';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {

    async function load() {
      // login yoksa → free göster
      if (!user) {
        setUsage(0);
        setLimit(50);
        return;
      }

      // login varsa → gerçek data çek
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
    <div className="relative overflow-hidden">

      {/* HERO */}
      <section className="grid md:grid-cols-2 max-w-6xl mx-auto py-32 px-6 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-7xl font-bold leading-tight">
            Scale your API
            <span className="block text-blue-400">
              without limits
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            Track usage, enforce limits and monetize instantly.
          </p>

          <div className="flex gap-4">

            <Link
              href={user ? "/dashboard" : "/auth/login"}
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              🚀 Start Scaling API
            </Link>

            <Link
              href="/docs"
              className="border border-white/20 px-6 py-3 rounded-lg"
            >
              Docs
            </Link>

          </div>

        </div>

        {/* RIGHT (REAL DATA PANEL) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">

          <p className="text-sm text-gray-400">Usage</p>

          <div className="w-full h-3 bg-gray-800 rounded mt-2">
            <div
              className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {usage} / {limit} requests
          </p>

          {!user && (
            <p className="text-xs text-gray-400 mt-2">
              Free plan preview
            </p>
          )}

          {percent > 80 && (
            <p className="text-red-400 text-xs mt-2">
              ⚠️ Limit almost reached
            </p>
          )}

          <button className="bg-green-600 px-4 py-2 rounded mt-4 animate-pulse">
            Upgrade
          </button>

        </div>

      </section>

    </div>
  );
}
