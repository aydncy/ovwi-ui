'use client';

import { useState } from 'react';

export default function Docs() {

  const [response, setResponse] = useState("");

  const run = async () => {
    const res = await fetch('/api/ovwi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: "bad seo content" })
    });

    const data = await res.json();
    setResponse(data?.data?.optimized_text || "error");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10 grid md:grid-cols-2 gap-10">

      <div>
        <h1 className="text-5xl font-bold mb-4">
          Ship webhook verification
        </h1>

        <p className="text-slate-400 mb-6">
          Test your API instantly
        </p>

        <button onClick={run} className="bg-cyan-500 px-6 py-3 rounded">
          Verify Request
        </button>
      </div>

      <div className="bg-white/5 p-6 rounded-xl">
        <p className="mb-2">Response</p>
        <p>{response}</p>
      </div>

    </div>
  );
}
