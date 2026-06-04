'use client';

import { useEffect, useState } from 'react';
import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function Dashboard() {
  const [remaining, setRemaining] = useState(0);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true })
      });

      const data = await res.json();
      console.log("VERIFY RESPONSE:", data);

      setRemaining(Number(data.remaining) || 0);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-5xl font-bold mb-2">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-white/60">Usage</p>
          <h2 className="text-3xl mt-2">0</h2>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-white/60">Limit</p>
          <h2 className="text-3xl mt-2 text-green-400">1000</h2>
        </div>

        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-white/60">Plan</p>
          <h2 className="text-3xl mt-2 text-yellow-400">pro</h2>
        </div>

      </div>

      <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10">
        <p className="mb-2 text-white/60">Remaining Requests</p>
        <h2 className="text-4xl">{remaining}</h2>

        <button
          onClick={verify}
          disabled={loading}
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          {loading ? "Running..." : "Run Verify"}
        </button>
      </div>

    </div>
  );
}
