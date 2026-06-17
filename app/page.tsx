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

      {/* HERO */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 py-28 items-center">

        {/* LEFT */}
        <div className="space-y-6 max-w-xl">

          <h1 className="text-6xl font-bold leading-tight">
            Scale your API
            <span className="block text-blue-400">
              without limits
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            Track usage, enforce limits and monetize your API in minutes.
          </p>

          {/* CTA */}
          <div className="flex gap-4 mt-4">

            {user ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:scale-105 transition"
              >
                Open Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:scale-105 transition"
              >
                Get Started Free
              </Link>
            )}

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

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">

          <p className="text-sm text-gray-400">Usage</p>

          <div className="w-full h-3 bg-gray-800 rounded mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
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

        </div>

      </section>

      {/* TRUST SECTION */}
      <section className="max-w-5xl mx-auto text-center pb-20">
        <p className="text-gray-500 text-sm">
          Used by developers building production-ready APIs
        </p>
      </section>

    </div>
  );
}
