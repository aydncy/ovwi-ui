'use client';

import { useAuth } from '@/components/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-32">

      {/* HERO */}
      <section className="text-center mt-32 space-y-8">

        <h1 className="text-6xl font-bold leading-tight">
          Stop building APIs <br />
          <span className="text-blue-500">start scaling them</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          OVWI gives you instant API infrastructure with usage tracking, limits,
          and monetization built-in.
        </p>

        <div className="flex gap-6 justify-center mt-10">

          {user ? (
            <a href="/dashboard" className="bg-blue-600 px-8 py-4 rounded-lg text-lg">
              Go to Dashboard
            </a>
          ) : (
            <a href="/auth/login" className="bg-blue-600 px-8 py-4 rounded-lg text-lg">
              Get Started Free
            </a>
          )}

          <a href="/docs" className="border px-8 py-4 rounded-lg text-lg">
            View Docs
          </a>

        </div>

        <p className="text-xs text-gray-500">
          Free plan is for testing only
        </p>

      </section>

      {/* SOCIAL PROOF */}
      <section className="text-center text-gray-500">
        Used by 1,248+ developers building real applications
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">

        <div className="card">
          <h3 className="text-lg font-bold">Track Usage</h3>
          <p className="text-gray-400 mt-2">
            See every API call in real-time
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold">Enforce Limits</h3>
          <p className="text-gray-400 mt-2">
            Automatically block users at limit
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold">Monetize Instantly</h3>
          <p className="text-gray-400 mt-2">
            Built-in billing & paywall system
          </p>
        </div>

      </section>

      {/* PRICING */}
      {!user && (
        <section className="space-y-12 text-center">

          <h2 className="text-4xl font-bold">Simple Pricing</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            <div className="card opacity-70">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-gray-400">50 requests</p>
            </div>

            <div className="card border-2 border-green-500 scale-105">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-gray-400">2000 requests</p>
              <p className="mt-4 text-green-400 font-bold">€9</p>
            </div>

            <div className="card border-2 border-purple-500 scale-105">
              <h3 className="text-xl font-bold">Scale</h3>
              <p className="text-gray-400">10000 requests</p>
              <p className="mt-4 text-purple-400 font-bold">€29</p>
            </div>

          </div>

        </section>
      )}

      {/* FINAL CTA */}
      <section className="text-center space-y-6">

        <h2 className="text-4xl font-bold">
          Start building today
        </h2>

        {!user && (
          <a href="/auth/login" className="bg-blue-600 px-8 py-4 rounded-lg text-lg">
            Create Free Account
          </a>
        )}

      </section>

    </div>
  );
}
