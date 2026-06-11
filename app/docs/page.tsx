'use client';

export default function Docs() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-8">API Documentation</h1>

      {/* ✅ CREATE KEY */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Create API Key</h2>

        <div className="bg-[#0f172a] border border-[#1f2937] p-4 rounded-lg">
<pre>
POST /api/create-key
</pre>
        </div>
      </div>

      {/* ✅ VERIFY */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Verify Endpoint</h2>

        <div className="bg-[#0f172a] border border-[#1f2937] p-4 rounded-lg">
<pre>
{`POST /api/verify
{"email":"you@co.com"}`}
</pre>
        </div>
      </div>

    </div>
  );
}
