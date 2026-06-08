'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-white px-10 py-16">

      {/* HERO */}
      <div className="max-w-4xl">
        
        <h1 className="text-6xl font-extrabold leading-tight">
          Build. Scale.<br/>Monetize APIs.
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          Build and scale production-ready APIs with authentication,
          usage tracking and monetization built-in.
        </p>

        {/* CTA */}
        <div className="mt-8 flex gap-4">
          
          <button
            onClick={() => window.location.href='/auth/login'}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold shadow-lg hover:opacity-90"
          >
            Start Free →
          </button>

          <button className="px-5 py-3 rounded-lg bg-card border border-border text-gray-300">
            Try Demo
          </button>

        </div>

        {/* API */}
        <div className="mt-8 bg-card border border-border p-4 rounded-lg max-w-md">
          <p className="text-gray-500 text-sm">API Example</p>
<pre className="text-sm mt-2">
{`curl -X POST https://ovwi.cyzora.com/api/external-verify
-H "x-api-key: YOUR_KEY"
-d '{"event":"test"}'`}
</pre>
        </div>

      </div>

      {/* FEATURES */}
      <div className="mt-24">
        <h2 className="text-2xl font-semibold">What you get</h2>

        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-card border border-border p-6 rounded-xl hover:scale-105 transition">
            <h3 className="font-semibold">API Infrastructure</h3>
            <p className="text-gray-400 mt-2">
              Production-ready API with auth and tracking.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-xl hover:scale-105 transition">
            <h3 className="font-semibold">Usage Control</h3>
            <p className="text-gray-400 mt-2">
              Built-in limits and scalable plans.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-xl hover:scale-105 transition">
            <h3 className="font-semibold">Developer Ready</h3>
            <p className="text-gray-400 mt-2">
              Simple API and fast integration.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="mt-28 text-center">
        
        <h2 className="text-3xl font-bold">
          Start building today
        </h2>

        <button
          onClick={() => window.location.href='/auth/login'}
          className="mt-6 px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold shadow-xl hover:opacity-90"
        >
          Get Started
        </button>

      </div>

    </div>
  );
}
