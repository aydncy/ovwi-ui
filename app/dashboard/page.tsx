import Guard from "./guard";
    </>
);
'use client';
    </>
);

    </>
);
import { useEffect, useState } from 'react';
    </>
);
import { supabase } from '@/lib/supabase-browser';
    </>
);

    </>
);
export default function Dashboard() {
    </>
);
  const [email, setEmail] = useState('');
    </>
);
  const [usage, setUsage] = useState(0);
    </>
);
  const [apiKey, setApiKey] = useState('');
    </>
);
  const [limit, setLimit] = useState(50);
    </>
);

    </>
);
  async function fetchUsage(userEmail: string) {
    </>
);
    const res = await fetch('/api/verify', {
    </>
);
      method: 'POST',
    </>
);
      body: JSON.stringify({ email: userEmail })
    </>
);
    });
    </>
);

    </>
);
    const data = await res.json();
    </>
);

    </>
);
    setUsage(data.usage);
    </>
);
    setApiKey(data.apiKey);
    </>
);
    setLimit(data.limit);
    </>
);
  }
    </>
);

    </>
);
  useEffect(() => {
    </>
);
    async function load() {
    </>
);
      if (!supabase) return;
    </>
);

    </>
);
      const { data } = await supabase.auth.getUser();
    </>
);
      const userEmail = data?.user?.email;
    </>
);

    </>
);
      if (userEmail) {
    </>
);
        setEmail(userEmail);
    </>
);
        fetchUsage(userEmail);
    </>
);
      }
    </>
);
    }
    </>
);
    load();
    </>
);
  }, []);
    </>
);

    </>
);
  return (
    </>
);
    <>
    </>
);
      <Guard />
    </>
);

    </>
);
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">
    </>
);

    </>
);
      <div className="max-w-5xl mx-auto space-y-8">
    </>
);

    </>
);
        {/* HEADER */}
    </>
);
        <div>
    </>
);
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
    </>
);
          <p className="text-gray-400">{email}</p>
    </>
);
          <p className="text-sm mt-1 text-blue-400">
    </>
);
            Plan: {limit < 100 ? 'Free' : limit < 5000 ? 'Pro' : 'Scale'}
    </>
);
          </p>
    </>
);
        </div>
    </>
);

    </>
);
        {/* API KEY */}
    </>
);
        <div className="backdrop-blur bg-white/5 border border-white/10 rounded-xl p-5">
    </>
);
          <div className="flex justify-between items-center mb-2">
    </>
);
            <p className="text-gray-400 text-sm">Your API Key</p>
    </>
);

    </>
);
            <button
    </>
);
              onClick={() => navigator.clipboard.writeText(apiKey)}
    </>
);
              className="text-xs text-blue-400 hover:underline"
    </>
);
            >
    </>
);
              Copy
    </>
);
            </button>
    </>
);
          </div>
    </>
);

    </>
);
          <div className="bg-black/60 p-3 rounded font-mono text-sm">
    </>
);
            {apiKey || 'Loading...'}
    </>
);
          </div>
    </>
);
        </div>
    </>
);

    </>
);
        {/* PANIC COUNTDOWN */}
    </>
);
        {usage >= limit - 1 && usage < limit && (
    </>
);
          <div className="bg-red-700/80 border border-red-500 p-4 rounded-xl animate-pulse">
    </>
);
            <p className="font-bold text-lg">⚠️ Last request remaining</p>
    </>
);
          </div>
    </>
);
        )}
    </>
);

    </>
);
        {/* USAGE */}
    </>
);
        <div className="backdrop-blur bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
    </>
);

    </>
);
          <div className="flex justify-between text-sm text-gray-400">
    </>
);
            <span>{usage} used</span>
    </>
);
            <span>{limit} limit</span>
    </>
);
          </div>
    </>
);

    </>
);
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
    </>
);
            <div
    </>
);
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 transition-all duration-500"
    </>
);
              style={{ width: `${(usage / limit) * 100}%` }}
    </>
);
            />
    </>
);
          </div>
    </>
);

    </>
);
          <p className="text-xs text-gray-500">
    </>
);
            {limit - usage} remaining
    </>
);
          </p>
    </>
);
        </div>
    </>
);

    </>
);
        {/* ACTIONS */}
    </>
);
        <div className="flex gap-4">
    </>
);

    </>
);
          <button
    </>
);
            onClick={async () => {
    </>
);
              const res = await fetch('/api/external-verify', {
    </>
);
                method: 'POST',
    </>
);
                body: JSON.stringify({ email })
    </>
);
              });
    </>
);

    </>
);
              const data = await res.json();
    </>
);

    </>
);
              if (data.error === 'LIMIT_REACHED') {
    </>
);
                alert('Limit reached — upgrade required');
    </>
);
                return;
    </>
);
              }
    </>
);

    </>
);
              setUsage(data.usage);
    </>
);
            }}
    </>
);
            className="bg-blue-600 px-5 py-2 rounded-lg hover:scale-105 transition"
    </>
);
          >
    </>
);
            Run Test
    </>
);
          </button>
    </>
);

    </>
);
          <button
    </>
);
            onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_pro'}
    </>
);
            className="bg-green-600 px-5 py-2 rounded-lg animate-pulse hover:scale-110 transition shadow-lg shadow-green-500/40"
    </>
);
          >
    </>
);
            Upgrade Pro (€9)
    </>
);
          </button>
    </>
);

    </>
);
          <button
    </>
);
            onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_scale'}
    </>
);
            className="bg-purple-600 px-5 py-2 rounded-lg animate-pulse hover:scale-110 transition shadow-lg shadow-purple-500/40"
    </>
);
          >
    </>
);
            Upgrade Scale (€29)
    </>
);
          </button>
    </>
);

    </>
);
        </div>
    </>
);

    </>
);
      </div>
    </>
);
    </div>
    </>
);
  );
    </>
);
}
    </>
);
