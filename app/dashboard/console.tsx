'use client';

import { useState } from "react";

export default function Console({ apiKey }: { apiKey: string }) {
  const [endpoint, setEndpoint] = useState("/api/external-verify");
  const [payload, setPayload] = useState('{"event":"test"}');
  const [response, setResponse] = useState("");
  const [tab, setTab] = useState("response");

  const sendRequest = async () => {
    try {
      JSON.parse(payload);
    } catch {
      setResponse("Invalid JSON ❌");
      return;
    }

    const start = Date.now();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: payload
    });

    const json = await res.json();
    const duration = Date.now() - start;

    setResponse(JSON.stringify({
      ...json,
      _meta: { status: res.status, time: duration + "ms" }
    }, null, 2));
  };

  const copy = () => {
    navigator.clipboard.writeText(response);
  };

  const generateCode = () => {
    return `curl -X POST https://ovwi.cyzora.com${endpoint} \\
-H "x-api-key: ${apiKey}" \\
-H "Content-Type: application/json" \\
-d '${payload}'`;
  };

  return (
    <div className="mt-12 bg-[#0f172a] p-6 rounded-xl border border-[#1f2937]">

      <h2 className="text-lg font-semibold mb-4">API Console</h2>

      {/* ✅ endpoint */}
      <input
        value={endpoint}
        onChange={e => setEndpoint(e.target.value)}
        className="w-full p-2 mb-3 bg-black border border-gray-700 rounded"
      />

      {/* ✅ payload */}
      <textarea
        value={payload}
        onChange={e => setPayload(e.target.value)}
        className="w-full h-28 p-2 mb-3 bg-black border border-gray-700 rounded"
      />

      {/* ✅ actions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={sendRequest}
          className="px-4 py-2 bg-blue-500 rounded"
        >
          Send
        </button>

        <button
          onClick={copy}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          Copy
        </button>
      </div>

      {/* ✅ tabs */}
      <div className="flex gap-4 mb-3 text-sm text-gray-400">
        <button onClick={()=>setTab("response")}>Response</button>
        <button onClick={()=>setTab("code")}>cURL</button>
      </div>

      {/* ✅ output */}
      {tab === "response" ? (
        <pre className="p-3 bg-black rounded text-xs overflow-auto">
          {response}
        </pre>
      ) : (
        <pre className="p-3 bg-black rounded text-xs overflow-auto">
          {generateCode()}
        </pre>
      )}

    </div>
  );
}
