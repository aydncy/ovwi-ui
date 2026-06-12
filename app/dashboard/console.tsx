'use client';

import { useState } from "react";

export default function Console({ apiKey }: { apiKey: string }) {
  const [endpoint, setEndpoint] = useState("/api/external-verify");
  const [payload, setPayload] = useState('{"event":"test"}');
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<number | null>(null);

  const sendRequest = async () => {
    setLoading(true);

    const start = Date.now();

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: payload
      });

      const data = await res.json();
      const duration = Date.now() - start;

      setTime(duration);

      const formatted = JSON.stringify(data, null, 2);
      setResponse(formatted);

      setHistory(prev => [
        { endpoint, payload, response: formatted },
        ...prev
      ]);

    } catch (e) {
      setResponse("Request failed");
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 bg-[#0f172a] p-6 rounded-xl border border-[#1f2937]">

      <h2 className="text-lg font-semibold mb-4">API Console</h2>

      {/* ✅ endpoint */}
      <select
        value={endpoint}
        onChange={e => setEndpoint(e.target.value)}
        className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
      >
        <option value="/api/external-verify">/external-verify</option>
        <option value="/api/verify">/verify (internal)</option>
      </select>

      {/* ✅ payload */}
      <textarea
        value={payload}
        onChange={e => setPayload(e.target.value)}
        className="w-full h-28 p-2 mb-3 bg-black border border-gray-700 rounded"
      />

      {/* ✅ button */}
      <button
        onClick={sendRequest}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 rounded"
      >
        {loading ? "Sending..." : "Send Request"}
      </button>

      {/* ✅ response */}
      <div className="mt-4">
        <p className="text-sm text-gray-400">
          Response {time && `(${time} ms)`}
        </p>

        <pre className="mt-2 p-3 bg-black rounded text-xs overflow-auto">
          {response}
        </pre>
      </div>

      {/* ✅ history */}
      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2">History</h3>

          <div className="space-y-2">
            {history.slice(0, 3).map((h, i) => (
              <div key={i} className="p-2 bg-black rounded text-xs">
                {h.endpoint}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
