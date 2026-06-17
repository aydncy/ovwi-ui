'use client';

import { useAuth } from '@/components/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/30 blur-3xl" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-600/30 blur-3xl" />

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto py-32 px-6">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-6xl font-bold leading-tight">
            Stop building APIs
            <br />
            <span className="text-blue-400">start scaling them</span>
          </h1>

          <p className="text-gray-400 text-lg">
            Production-ready API infra with usage tracking, limits,
            and monetization built-in.
          </p>

          <div className="flex gap-4 mt-6">

            {user ? (
              <a
               
                className="bg-blue-600 px-6 py-3 rounded-lg"
              >
                Go to Dashboard
              </a>
            ) : (
              <a
               
                className="bg-blue-600 px-6 py-3 rounded-lg"
              >
                Get Started
              </a>
            )}

            <a
                
              className="border border-white/20 px-6 py-3 rounded-lg"
            >
              Docs
            </a>

          </div>

          <p className="text-xs text-gray-500">
            Free plan is for testing only
          </p>

        </div>

        {/* RIGHT → FAKE DASHBOARD */}
        <div className="relative">

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur shadow-xl">

            <div className="space-y-3">

              <p className="text-sm text-gray-400">Usage</p>

              <div className="w-full h-3 bg-gray-800 rounded">
                <div className="w-2/3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
              </div>

              <p className="text-sm text-gray-500">
                1300 / 2000 requests
              </p>

              <button className="bg-green-600 px-4 py-2 rounded mt-3 animate-pulse">
                Upgrade
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">

        <div className="card">
          <h3 className="font-bold">Track Usage</h3>
          <p className="text-gray-400 mt-2">Monitor every API call</p>
        </div>

        <div className="card">
          <h3 className="font-bold">Enforce Limits</h3>
          <p className="text-gray-400 mt-2">Block users at limit</p>
        </div>

        <div className="card">
          <h3 className="font-bold">Monetize</h3>
          <p className="text-gray-400 mt-2">Built-in payment logic</p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-24">

        <h2 className="text-4xl font-bold mb-6">
          Start building now
        </h2>

        <a
          
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Create Free Account
        </a>

      </section>

    </div>
  );
}
