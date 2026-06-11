'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* ✅ NAVBAR */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

        <div className="flex gap-6 text-gray-400">
          <a href="/docs">Docs</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/auth/logout">Logout</a>
        </div>
      </div>

      {/* ✅ HERO */}
      <div className="max-w-6xl mx-auto px-6 mt-16">

        <h1 className="text-6xl font-extrabold leading-[1.1]">
          Build. Scale.<br/>Monetize APIs.
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl">
          Build and scale production-grade APIs with authentication,
          usage tracking and monetization built-in.
        </p>

        {/* CTA */}
        <div className="mt-8 flex gap-4">

          <button
            onClick={() => window.location.href='/auth/login'}
            className="
              px-8 py-3 rounded-lg
              bg-gradient-to-r from-blue-500 to-cyan-400
              font-semibold
              shadow-lg shadow-blue-500/20
              hover:opacity-90
            "
          >
            Start Free →
          </button>

          <button className="
            px-6 py-3 rounded-lg
            bg-[#0f172a]
            border border-[#1f2937]
            text-gray-400
          ">
            Try Demo
          </button>
        </div>

        {/* API BLOCK */}
        <div className="
          mt-10
          bg-[#0f172a]
          border border-[#1f2937]
          p-5 rounded-xl
          max-w-md
          shadow-lg
        ">
          <p className="text-gray-500 text-sm">API Example</p>

<pre className="text-sm mt-2 text-gray-300">
{`curl -X POST https://ovwi.cyzora.com/api/external-verify
-H "x-api-key: YOUR_KEY"
-d '{"event":"test"}'`}
</pre>
        </div>

      </div>

      {/* ✅ FEATURES */}
      <div className="max-w-6xl mx-auto px-6 mt-28">
        <h2 className="text-2xl font-semibold">What you get</h2>

        <div className="grid grid-cols-3 gap-6 mt-10">

          {[
            {
              title: "API Infrastructure",
              desc: "Production-ready API with authentication and tracking."
            },
            {
              title: "Usage Control",
              desc: "Built-in limits and scalable API plans."
            },
            {
              title: "Developer Ready",
              desc: "Simple API and fast integration."
            }
          ].map((c, i)=>(
            <div key={i} className="
              bg-[#0f172a]
              border border-[#1f2937]
              p-6 rounded-xl
              shadow-md
              hover:shadow-xl hover:scale-[1.02]
              transition
            ">
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-gray-400 mt-2">{c.desc}</p>
            </div>
          ))}

        </div>
      </div>

      {/* ✅ CTA */}
      <div className="max-w-6xl mx-auto px-6 mt-32 text-center">

        <h2 className="text-3xl font-bold">
          Start building today
        </h2>

        <button
          onClick={() => window.location.href='/auth/login'}
          className="
            mt-6 px-10 py-4 rounded-xl
            bg-gradient-to-r from-blue-500 to-cyan-400
            shadow-xl shadow-blue-500/30
            font-semibold
          "
        >
          Get Started
        </button>

      </div>

    </div>
  );
}
