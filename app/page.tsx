'use client';

export default function Home() {
  return (
    <div className="space-y-20">

      {/* HERO */}
      <section className="text-center mt-16 space-y-6">

        <h1 className="text-5xl font-bold leading-tight">
          Stop building APIs. <br />
          Start scaling them.
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          OVWI gives you instant API infrastructure with usage tracking, limits, and scaling built-in.
        </p>

        <div className="flex gap-4 justify-center mt-6">

          <a href="/auth/signup"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:scale-105 transition">
            Get Started Free
          </a>

          <a href="/docs"
            className="px-6 py-3 border border-white/20 rounded-lg">
            View Docs
          </a>

        </div>

      </section>

      {/* SOCIAL PROOF */}
      <section className="text-center text-gray-500">
        Trusted by developers building real applications
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6">

        <div className="card">
          <h3 className="font-bold">Usage Tracking</h3>
          <p className="text-gray-400 text-sm mt-2">
            Monitor every API request in real-time.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Built-in Limits</h3>
          <p className="text-gray-400 text-sm mt-2">
            Control usage and enforce pricing instantly.
          </p>
        </div>

        <div className="card">
          <h3 className="font-bold">Scalable</h3>
          <p className="text-gray-400 text-sm mt-2">
            Designed for production workloads.
          </p>
        </div>

      </section>

      {/* PRICING */}
      <section className="text-center space-y-10">

        <h2 className="text-3xl font-bold">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {/* FREE */}
          <div className="card space-y-4">
            <h3 className="text-xl font-bold">Free</h3>
            <p className="text-gray-400">50 requests</p>

            <p className="text-xs text-gray-500">
              For testing only
            </p>

            <a href="/auth/signup"
              className="btn btn-primary w-full">
              Start Free
            </a>
          </div>

          {/* PRO */}
          <div className="card space-y-4 border-2 border-green-500">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="text-gray-400">2000 requests</p>

            <a href="https://aydncy.gumroad.com/l/ovwi_pro"
              className="btn btn-pro w-full">
              Buy €9
            </a>
          </div>

          {/* SCALE */}
          <div className="card space-y-4 border-2 border-purple-500">
            <h3 className="text-xl font-bold">Scale</h3>
            <p className="text-gray-400">10000 requests</p>

            <a href="https://aydncy.gumroad.com/l/ovwi_scale"
              className="btn btn-scale w-full">
              Buy €29
            </a>
          </div>

        </div>

      </section>

      {/* CODE SAMPLE */}
      <section className="space-y-4">

        <h2 className="text-2xl font-bold">Simple API</h2>

        <div className="bg-black/60 p-4 rounded font-mono text-sm">
{`fetch('/api/external-verify', {
  method: 'POST',
  body: JSON.stringify({ email })
})`}
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="text-center space-y-6">

        <h2 className="text-3xl font-bold">
          Start building today
        </h2>

        <a href="/auth/signup"
          className="px-8 py-4 bg-blue-600 rounded-lg hover:scale-110 transition text-lg">
          Create Free Account
        </a>

      </section>

    </div>
  );
}
