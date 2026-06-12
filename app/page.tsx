'use client';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-white">

      {/* ✅ HERO */}
      <h1 className="text-6xl font-extrabold leading-tight">
        Build. Scale.<br/>Monetize APIs.
      </h1>

      <p className="mt-6 text-gray-400 max-w-xl">
        Build and scale production-grade APIs with authentication,
        usage tracking and monetization built-in.
      </p>

      {/* ✅ CTA */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => window.location.href='/auth/login'}
          className="px-6 py-3 bg-blue-500 rounded"
        >
          Start Free →
        </button>

        <button className="px-6 py-3 border border-gray-700 rounded">
          Try Demo
        </button>
      </div>

      {/* ✅ API EXAMPLE */}
      <div className="mt-10 bg-[#0f172a] border border-gray-800 p-4 rounded-xl max-w-md">
<pre className="text-sm">
{`curl -X POST https://ovwi.cyzora.com/api/external-verify
-H "x-api-key: YOUR_KEY"
-d '{"event":"test"}'`}
</pre>
      </div>

      {/* ✅ FEATURES */}
      <div className="mt-20 grid grid-cols-3 gap-6">
        {["API Infrastructure","Usage Control","Developer Ready"].map((t,i)=>(
          <div key={i} className="bg-[#0f172a] p-5 rounded-xl border border-gray-800">
            <h3 className="font-semibold">{t}</h3>
            <p className="text-gray-400 text-sm mt-2">
              Production-ready system.
            </p>
          </div>
        ))}
      </div>

      {/* ✅ CTA */}
      <div className="mt-24 text-center">
        <button
          onClick={()=>window.location.href='/auth/login'}
          className="px-10 py-4 bg-blue-500 rounded"
        >
          Get Started
        </button>
      </div>

    </div>
  );
}
