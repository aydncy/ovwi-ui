'use client';

import { useEffect, useState } from 'react';
import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function Dashboard() {
  const [remaining, setRemaining] = useState(0);
  const [apiKey, setApiKey] = useState("ovwi_live_xxxxxxxxxxxxxx");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        window.location.href = '/auth/login';
      }
    };
    init();
  }, []);

  const verify = async () => {
    const res = await fetch('/api/verify', { method: 'POST' });
    const data = await res.json();
    setRemaining(Number(data.remaining) || 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-2">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p>Usage</p>
          <h2 className="text-3xl mt-2">0</h2>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p>Limit</p>
          <h2 className="text-3xl text-green-400 mt-2">1000</h2>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p>Plan</p>
          <h2 className="text-3xl text-yellow-400 mt-2">pro</h2>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10">
        <p className="mb-2">API Key</p>

        <div className="flex gap-2">
          <input
            value={apiKey}
            readOnly
            className="flex-1 p-3 rounded-xl bg-black/40"
          />
          <button
            onClick={() => navigator.clipboard.writeText(apiKey)}
            className="px-4 bg-cyan-500 rounded-xl"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10">
        <p className="mb-2">Remaining</p>
        <h2 className="text-4xl">{remaining}</h2>

        <button
          onClick={verify}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
        >
          Run Verify
        </button>
      </div>

    </div>
  );
}
