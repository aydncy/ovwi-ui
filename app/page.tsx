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
    <div className="relative">

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-28 items-center">

        {/* LEFT */}
        <div className="space-y-6 max-w-xl">

          <h1 className="text-6xl font-bold">
            Scale your API
            <span className="block text-blue-400">
              without limits
            </span>
          </h1>

          <p className="text-gray-400">
            Track usage, enforce limits and monetize your API fast.

⚡ Most users upgrade within first few minutes and monetize your API fast.

⚡ Most users upgrade within first few minutes and turn traffic into revenue.
          </p>

          <div className="flex gap-4 mt-4">

            <Link
              href={user ? "/dashboard" : "/auth/login"}
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              🚀 🚀 🚀 Start Scaling API (Free → 🚀 Upgrade Now Required) (Free → 🚀 Upgrade Now Required)
            </Link>

            <Link
              href="/docs"
              className="border border-white/20 px-6 py-3 rounded-lg"
            >
              Docs
            </Link>

          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">

          <p className="text-sm text-gray-400">Usage</p>

          <div className="w-full h-3 bg-gray-800 rounded mt-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {usage} / {limit}
          </p>

          <button className="bg-green-600 px-4 py-2 rounded mt-4">
            Upgrade
          </button>

        </div>

      </section>

    </div>
  );
}
