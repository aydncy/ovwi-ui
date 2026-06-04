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
        return;
      }

      // initial fetch
      await fetchUsage();
    };

    init();
  }, []);

  const fetchUsage = async () => {
    try {
      const res = await fetch('/api/verify', { method: 'POST' });
      const data = await res.json();

      setRemaining(Number(data.remaining) || 0);
    } catch (e) {
      console.error(e);
    }
  };

  const verify = async () => {
    setLoading(true);
    await fetchUsage();
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p className="text-white/60">Usage</p>
          <h2 className="text-3xl mt-2">0</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p className="text-white/60">Limit</p>
          <h2 className="text-3xl mt-2 text-green-400">1000</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p className="text-white/60">Plan</p>
          <h2 className="text-3xl mt-2 text-yellow-400">Pro</h2>
        </div>

      </div>

      <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
        <p className="text-white/60 mb-2">Remaining Requests</p>
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
