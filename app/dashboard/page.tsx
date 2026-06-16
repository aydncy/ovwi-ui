'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [limit, setLimit] = useState(50);

  async function fetchUsage(userEmail: string) {
    const res = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({ email: userEmail })
    });

    const data = await res.json();

    setUsage(data.usage);
    setApiKey(data.apiKey);
    setLimit(data.limit);
  }

  useEffect(() => {
    async function load() {
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();
      const userEmail = data?.user?.email;

      if (userEmail) {
        setEmail(userEmail);
        fetchUsage(userEmail);
      }
    }

    load();
  }, []);

  // PAYWALL ACTIVE
if (usage >= limit) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded text-center max-w-md space-y-6">

        <h2 className="text-2xl font-bold text-white">
          Limit Reached
        </h2>

        <p className="text-gray-400">
          You’ve used all your API requests.
        </p>

        <p className="text-sm text-gray-500">
          Upgrade to continue using OVWI API
        </p>

        <div className="space-y-3">

          <button
            onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_pro'}
            className="bg-green-600 w-full py-3 rounded"
          >
            Upgrade to Pro (€9)
          </button>

          <button
            onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_scale'}
            className="bg-purple-600 w-full py-3 rounded"
          >
            Upgrade to Scale (€29)
          </button>

        </div>

        <p className="text-xs text-gray-600">
          Free plan is for testing only
        </p>

      </div>
    </div>
  );
}

return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">{email}</p>
        <p className="text-gray-400">
          Plan: {limit === 50 ? 'Free' : limit === 2000 ? 'Pro' : 'Scale'}
        </p>
      </div>

      {/* API KEY */}
      <div className="border border-gray-800 rounded p-4">
        <p className="text-sm text-gray-400 mb-2">Your API Key</p>
        <div className="bg-black p-3 rounded text-sm">
          {apiKey || 'Loading...'}
        </div>
      </div>

      {/* PANIC MODE ACTIVE */}

{usage >= limit - 1 && usage < limit && (
  <div className="bg-red-700 text-white p-4 rounded mb-4 animate-pulse border-4 border-red-500">

    <p className="text-lg font-bold">
      ⚠️ LAST REQUEST REMAINING
    </p>

    <p className="text-sm mt-1">
      Your API access is about to stop
    </p>

  </div>
)}

{usage >= limit * 0.9 && usage < limit - 1 && (
  <div className="bg-yellow-500 text-black p-3 rounded mb-4">
    ⚠️ You're about to hit your limit
  </div>
)}

{/* LIMIT WARNING */}
      {usage >= limit && (
        <div className="bg-red-600 text-white p-3 rounded">
          Limit reached — upgrade required
        </div>
      )}

      {usage > limit * 0.8 && usage < limit && (
        <div className="bg-yellow-500 text-black p-3 rounded">
          You're close to your limit
        </div>
      )}

      {/* USAGE */}
      <div className="border border-gray-800 rounded p-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{usage} used</span>
          <span>{limit} limit</span>
        </div>

        <div className="w-full bg-gray-800 h-2 rounded">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${(usage / limit) * 100}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {limit - usage} remaining
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">

        <button
          onClick={async () => {
            const res = await fetch('/api/external-verify', {
              method: 'POST',
              body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.error === 'LIMIT_REACHED') {
              alert('Limit reached — upgrade required');
              return;
            }

            setUsage(data.usage);
          }}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Run Test Request
        </button>

        <button
          onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_pro'}
          className="bg-green-600 px-4 py-2 rounded animate-bounce hover:scale-110 transition-transform shadow-lg shadow-green-400/60 animate-pulse hover:scale-110 transition-transform duration-200 shadow-lg shadow-green-500/50"
        >
          Buy Pro (€9)
        </button>

        <button
          onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_scale'}
          className="bg-purple-600 px-4 py-2 rounded animate-bounce hover:scale-110 transition-transform shadow-lg shadow-purple-400/60 animate-pulse hover:scale-110 transition-transform duration-200 shadow-lg shadow-purple-500/50"
        >
          Buy Scale (€29)
        </button>

      </div>

    </div>
  );
}
