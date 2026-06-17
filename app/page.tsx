'use client';

import { useAuth } from '@/components/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-28">

      {/* HERO */}
      <section className="text-center mt-24 space-y-8">

        <h1 className="text-6xl font-bold">
          Build APIs <br />
          <span className="text-blue-500">without limits</span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Production-ready API infrastructure with usage tracking and scaling.
        </p>

        <div className="flex gap-6 justify-center">

          {user ? (
            <a href="/dashboard"
              className="bg-green-600 px-8 py-4 rounded-lg text-lg">
              Go to Dashboard
            </a>
          ) : (
            <a href="/auth/login"
              className="bg-blue-600 px-8 py-4 rounded-lg text-lg">
              Get Started Free
            </a>
          )}

        </div>

      </section>

      {/* PRICING */}
      {!user && (
        <section className="text-center space-y-10">
          <h2 className="text-3xl font-bold">Pricing</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            <div className="card">
              <h3>Free</h3>
              <p>50 requests</p>
            </div>

            <div className="card">
              <h3>Pro</h3>
              <p>2000 requests</p>
            </div>

            <div className="card">
              <h3>Scale</h3>
              <p>10000 requests</p>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
