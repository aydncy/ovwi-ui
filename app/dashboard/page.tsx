'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import Console from './console';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!supabase) return;

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = '/auth/login';
      return;
    }

    setEmail(data.user.email || '');

    // ✅ usage
    const { data: usageData } = await supabase
      .from('users_usage')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    if (usageData) {
      setUsage(usageData.usage);
      setLimit(usageData.monthly_limit);
    }

    // ✅ api key
    const { data: keyData } = await supabase
      .from('api_keys')
      .select('key')
      .eq('user_id', data.user.id)
      .single();

    if (keyData) {
      setApiKey(keyData.key);
    } else {
      const newKey = 'ovwi_' + Math.random().toString(36).substring(2);

      await supabase.from('api_keys').insert({
        user_id: data.user.id,
        key: newKey
      });

      setApiKey(newKey);
    }
  };

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

  const percent = limit ? (usage / limit) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-6">{email}</p>

      {/* ✅ API KEY */}
      <div className="bg-[#0f172a] p-4 rounded-lg mb-6 border border-gray-800">
        <p className="text-sm text-gray-400">Your API Key</p>
        <code className="text-sm break-all">{apiKey}</code>
      </div>

      {/* ✅ USAGE */}
      <div className="bg-[#0f172a] p-4 rounded-lg border border-gray-800">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>{usage} used</span>
          <span>{limit} limit</span>
        </div>

        <div className="w-full h-2 bg-[#1f2937] rounded mt-2">
          <div
            style={{ width: percent + '%' }}
            className="h-2 bg-blue-500 rounded"
          />
        </div>

        <p className="mt-2 text-sm text-gray-400">
          {limit - usage} remaining
        </p>
      </div>

      {/* ✅ ACTION */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={runVerify}
          className="px-5 py-2 bg-blue-500 rounded"
        >
          Run Test Request
        </button>

        <button
          onClick={() => window.location.href = '/upgrade'}
          className="px-5 py-2 border border-gray-700 rounded"
        >
          Upgrade
        </button>
      </div>

      {/* ✅ CONSOLE */}
      <Console apiKey={apiKey} />

      {/* ✅ INFO */}
      <p className="mt-6 text-xs text-gray-500">
        Test requests increase usage. Real API usage is tracked via your API key.
      </p>

    </div>
  );
}
