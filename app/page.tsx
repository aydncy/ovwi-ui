'use client';

export default function Home() {
  return (
    <div className="space-y-28">

      {/* HERO */}
      <section className="text-center mt-24 space-y-8">

        <h1 className="text-6xl font-bold leading-tight">
          Build APIs <br />
          <span className="text-blue-500">without limits</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          OVWI gives you production-ready API infrastructure with usage tracking, limits and scaling built-in.
        </p>

        <div className="flex gap-6 justify-center mt-8">

          <a href="/auth/signup"
            className="bg-blue-600 px-8 py-4 rounded-xl text-lg hover:scale-105 transition">
            Get Started Free
          </a>

          <a href="/docs"
            className="border border-white/20 px-8 py-4 rounded-xl text-lg hover:scale-105 transition">
            View Docs
          </a>

        </div>

        <p className="text-sm text-gray-500">
          Free plan is for testing only
        </p>

      </section>

      {/* SOCIAL PROOF */}
      <section className="text-center text-gray-500 text-sm">
        Used by 1,248+ developers building real applications
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <div className="card">
          <h3 className="font-bold text-lg">Usage Tracking</h3>
          <p className="text-gray-400 mt-2">
            Monitor every API request in real time
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-lg">Built-in Limits</h3>
          <p className="text-gray-400 mt-2">
            Control usage and enforce pricing instantly
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold text-lg">Production Ready</h3>
          <p className="text-gray-400 mt-2">
            Designed for real-world workloads
          </p>
        </div>

      </section>

      {/* PRICING */}
      <section className="space-y-12">

        <h2 className="text-4xl font-bold text-center">
          Pricing
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* FREE */}
          <div className="card text-center space-y-5 opacity-70">
            <h3 className="text-xl font-bold">Free</h3>
            <p className="text-gray-400">50 requests</p>

            <a href="/auth/signup"
              className="bg-blue-600 px-6 py-3 rounded-lg inline-block">
              Start Free
            </a>
          </div>

          {/* PRO */}
          <div className="card text-center space-y-6 border-2 border-green-500 scale-105">

            <h3 className="text-xl font-bold">Pro</h3>
            <p className="text-gray-400">2000 requests</p>

            <a href="https://aydncy.gumroad.com/l/ovwi_pro"
              className="bg-green-600 px-8 py-4 rounded-lg text-lg animate-pulse shadow-lg shadow-green-500/40 inline-block">
              Buy €9
            </a>

          </div>

          {/* SCALE */}
          <div className="card text-center space-y-6 border-2 border-purple-500 scale-105">

            <h3 className="text-xl font-bold">Scale</h3>
            <p className="text-gray-400">10000 requests</p>

            <a href="https://aydncy.gumroad.com/l/ovwi_scale"
              className="bg-purple-600 px-8 py-4 rounded-lg text-lg animate-pulse shadow-lg shadow-purple-500/40 inline-block">
              Buy €29
            </a>

          </div>

        </div>

      </section>

      {/* CODE */}
      <section className="max-w-4xl mx-auto space-y-6">

        <h2 className="text-2xl font-bold">
          Simple API
        </h2>

        <div className="bg-black/60 p-5 rounded-xl font-mono text-sm">
{`fetch('/api/external-verify', {
  method: 'POST',
  body: JSON.stringify({ email })
})`}
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center space-y-8">

        <h2 className="text-4xl font-bold">
          Start building today
        </h2>

        <a href="/auth/signup"
          className="bg-blue-600 px-10 py-5 rounded-xl text-lg hover:scale-105 transition">
          Create Free Account
        </a>

      </section>

    </div>
  );
}
