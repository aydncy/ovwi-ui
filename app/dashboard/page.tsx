'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const [limit, setLimit] = useState(50);

  // ✅ AUTH GUARD
  useEffect(() => {
    async function checkUser() {
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace('/auth/login');
        return;
      }

      setEmail(data.user.email || '');
      fetchUsage(data.user.email || '');
    }

    checkUser();
  }, []);

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

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">{email}</p>
      </div>

      <div className="border border-gray-800 rounded p-4">
        <p className="text-sm text-gray-400 mb-2">Your API Key</p>
        <div className="bg-black p-3 rounded text-sm">
          {apiKey || 'Loading...'}
        </div>
      </div>

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

      <button
        onClick={async () => {
          const res = await fetch('/api/external-verify', {
            method: 'POST',
            body: JSON.stringify({ email })
          });

          const data = await res.json();

          if (data.error === 'LIMIT_REACHED') {
            alert('Limit reached');
            return;
          }

          setUsage(data.usage);
        }}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Run Test Request
      </button>

    </div>
  );
}
