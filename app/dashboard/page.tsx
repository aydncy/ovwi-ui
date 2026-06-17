'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/useAuth';

export default function Dashboard() {
  const { user, loading } = useAuth();

  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      const res = await fetch('/api/verify', {
        method: 'POST',
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      setUsage(data.usage);
      setLimit(data.limit);
      setApiKey(data.apiKey);
    }

    fetchData();
  }, [user]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-16 space-y-10">

      <div className="text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400">{user.email}</p>
      </div>

      {/* API KEY */}
      <div className="card">
        <p className="text-sm text-gray-400 mb-2">Your API Key</p>
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

        <div className="w-full bg-gray-800 h-3 rounded overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3"
            style={{ width: `${(usage / limit) * 100}%` }}
          />
        </div>

        <p className="text-xs text-gray-500">
          {limit - usage} remaining
        </p>

      </div>

      {/* TEST BUTTON */}
      <div className="text-center">
        <button
          onClick={async () => {
            const res = await fetch('/api/external-verify', {
              method: 'POST',
              body: JSON.stringify({ email: user.email }),
            });

            const data = await res.json();

            if (data.error) {
              alert(data.error);
              return;
            }

            setUsage(data.usage);
          }}
          className="bg-blue-600 px-6 py-2 rounded"
        >
          Run Test Request
        </button>
      </div>

    </div>
  );
}
