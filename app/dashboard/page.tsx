'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/useAuth';

export default function Dashboard() {
  const { user } = useAuth();

  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (!user) return;

    async function load() {
      const res = await fetch('/api/verify', {
        method: 'POST',
        body: JSON.stringify({ email: user.email })
      });

      const data = await res.json();

      setUsage(data.usage);
      setLimit(data.limit);
      setApiKey(data.apiKey);
    }

    load();
  }, [user]);

  const percent = (usage / limit) * 100;

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-10">

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">{user?.email}</p>
      </div>

      {/* PLAN BADGE */}
      <div className="text-sm">
        Plan: <span className="text-blue-400">
          {limit < 100 ? 'Free' : limit < 5000 ? 'Pro' : 'Scale'}
        </span>
      </div>

      {/* API KEY */}
      <div className="card">
        <p className="text-gray-400 text-sm mb-2">API Key</p>
        <div className="bg-black/60 p-3 rounded font-mono text-sm">
          {apiKey}
        </div>
      </div>

      {/* USAGE */}
      <div className="card space-y-4">

        <div className="flex justify-between text-sm text-gray-400">
          <span>{usage} used</span>
          <span>{limit} limit</span>
        </div>

        <div className="w-full bg-gray-800 h-3 rounded">
          <div
            className={`h-3 rounded ${
              percent > 80 ? "bg-red-500" : "bg-gradient-to-r from-blue-500 to-purple-500"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>

        <p className="text-xs text-gray-500">
          {limit - usage} remaining
        </p>

        {percent > 80 && (
          <p className="text-red-400 text-sm">
            ⚠️ You are close to your limit
          </p>
        )}
      </div>

      {/* ACTION */}
      <div className="flex gap-4">

        <button
          onClick={async () => {
            const res = await fetch('/api/external-verify', {
              method: 'POST',
              body: JSON.stringify({ email: user.email })
            });

            const data = await res.json();

            if (data.error) {
              alert(data.error);
              return;
            }

            setUsage(data.usage);
          }}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Run Test
        </button>

        <button
          onClick={() => window.location.href='https://aydncy.gumroad.com/l/ovwi_pro'}
          className="bg-green-600 px-4 py-2 rounded animate-pulse"
        >
          Upgrade Pro
        </button>

      </div>

    </div>
  );
}
