'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    supabase!.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setEmail(data.user.email || '');
    });
  }, []);

  const runVerify = async () => {
    const session = await supabase!.auth.getSession();
    const token = session.data.session?.access_token;

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    const data = await res.json();

    if (data.upgrade) {
      window.location.href = '/upgrade';
      return;
    }

    setUsage(data.usage);
    setLimit(data.limit);
  };

  const percent = limit ? Math.min((usage / limit) * 100, 100) : 0;
  const isNear = usage >= limit * 0.8;
  const isFull = usage >= limit;

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* ✅ HEADER */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span className="text-gray-400">{email}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* 🔥 PLAN STATUS */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Your Usage
          </h2>

          <span className="
            px-3 py-1 rounded-full text-sm
            bg-[#1f2937]
          ">
            {limit > 50 ? 'PRO' : 'FREE'}
          </span>
        </div>

        {/* 🔥 WARNING */}
        {isNear && !isFull && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            ⚡ You’re close to your limit. Upgrade soon.
          </div>
        )}

        {isFull && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            🚫 Limit reached. Upgrade to continue.
          </div>
        )}

        {/* ✅ CARD */}
        <div className="
          bg-[#0f172a]
          border border-[#1f2937]
          rounded-xl p-6
        ">

          <div className="flex justify-between mb-3 text-gray-400">
            <span>{usage} used</span>
            <span>{limit} limit</span>
          </div>

          {/* ✅ PROGRESS BAR */}
          <div className="w-full h-3 bg-[#1f2937] rounded-full overflow-hidden">
            <div
              style={{ width: percent + '%' }}
              className="
                h-full
                bg-gradient-to-r from-blue-500 to-cyan-400
                transition-all
              "
            />
          </div>

          <p className="mt-3 text-gray-400">
            {limit - usage} requests remaining
          </p>

        </div>

        {/* ✅ ACTIONS */}
        <div className="mt-6 flex gap-4">

          <button
            onClick={runVerify}
            disabled={isFull}
            className={`
              px-6 py-3 rounded-lg font-semibold
              ${isFull 
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:opacity-90'
              }
            `}
          >
            Run Verification
          </button>

          <button
            onClick={()=>window.location.href='/upgrade'}
            className="
              px-6 py-3 rounded-lg
              bg-[#111827]
              border border-[#1f2937]
              text-gray-300
            "
          >
            Upgrade Plan →
          </button>

        </div>

        {/* 🔥 UPGRADE CARD */}
        <div className="
          mt-10
          bg-gradient-to-r from-blue-500/10 to-cyan-400/10
          border border-blue-500/20
          p-6 rounded-xl
        ">

          <h3 className="text-lg font-semibold">
            Need more capacity?
          </h3>

          <p className="text-gray-400 mt-2">
            Upgrade to Pro to unlock higher limits and production usage.
          </p>

          <button
            onClick={()=>window.location.href='/upgrade'}
            className="
              mt-4 px-6 py-3 rounded-lg
              bg-gradient-to-r from-blue-500 to-cyan-400
              font-semibold
            "
          >
            Upgrade to Pro
          </button>

        </div>

      </div>
    </div>
  );
}
