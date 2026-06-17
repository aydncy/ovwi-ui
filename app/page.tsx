'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/components/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden">

      {/* glow */}
      <div className="absolute -top-40 left-0 w-96 h-96 bg-blue-600/30 blur-3xl" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-600/30 blur-3xl" />

      {/* HERO */}
      <section className="grid md:grid-cols-2 max-w-6xl mx-auto py-32 px-6 items-center gap-12">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-7xl font-bold leading-tight">
            Scale your API
            <span className="block text-blue-400">
              without limits
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            Track usage, enforce limits and monetize your API in minutes.
          </p>

          <div className="flex gap-4">

            <Link
              href={user ? "/dashboard" : "/auth/login"}
              className="bg-blue-600 px-6 py-3 rounded-lg hover:scale-105 transition"
            >
              🚀 Start Scaling API
            </Link>

            <Link
              href="/docs"
              className="border border-white/20 px-6 py-3 rounded-lg hover:scale-105 transition"
            >
              Docs
            </Link>

          </div>

          <p className="text-xs text-gray-500">
            Free plan is not for production use
          </p>

        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">

          <p className="text-sm text-gray-400">Usage</p>

          <div className="w-full h-3 bg-gray-800 rounded mt-2">
            <div className="w-2/3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            1300 / 2000 requests
          </p>

          <p className="text-red-400 text-xs mt-2">
            ⚠️ Limit almost reached
          </p>

          <button className="bg-green-600 px-4 py-2 rounded mt-4 animate-pulse">
            Upgrade
          </button>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        <div className="card hover:scale-105 transition">
          <h3 className="font-bold">Track Usage</h3>
          <p className="text-gray-400 mt-2">
            Monitor every API call
          </p>
        </div>

        <div className="card hover:scale-105 transition">
          <h3 className="font-bold">Enforce Limits</h3>
          <p className="text-gray-400 mt-2">
            Block users automatically
          </p>
        </div>

        <div className="card hover:scale-105 transition">
          <h3 className="font-bold">Monetize</h3>
          <p className="text-gray-400 mt-2">
            Turn usage into revenue
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-24">

        <h2 className="text-4xl font-bold mb-6">
          Start building today
        </h2>

        <Link
          href="/auth/login"
          className="bg-blue-600 px-6 py-3 rounded-lg hover:scale-110 transition"
        >
          Create Free Account
        </Link>

      </section>

    </div>
  );
}
