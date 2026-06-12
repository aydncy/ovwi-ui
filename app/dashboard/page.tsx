'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import Console from './console';


export default function Dashboard() {

  const sendRequest = async () => {
    const endpoint = (document.getElementById("endpoint") as any).value;
    const payload = (document.getElementById("payload") as any).value;
    const responseBox = document.getElementById("responseBox");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: payload
      });

      const data = await res.json();

      if (responseBox) {
        responseBox.innerText = JSON.stringify(data, null, 2);
      }

    } catch (e) {
      if (responseBox) {
        responseBox.innerText = "Error";
      }
    }
  };

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!supabase) return;
    const { data } = await supabase!!.auth.getUser();

    if (!data.user) {
      window.location.href = '/auth/login';
      return;
    }

    setEmail(data.user.email || '');

    // ✅ usage çek
    const { data: usageData } = await supabase!
      .from('users_usage')
      .select('*')
      .eq('user_id', data.user.id)
      .single();

    if (usageData) {
      setUsage(usageData.usage);
      setLimit(usageData.monthly_limit);
    }

    // ✅ API KEY çek
    const { data: keyData } = await supabase!
      .from('api_keys')
      .select('key')
      .eq('user_id', data.user.id)
      .single();

    if (!keyData) {
        const newKey = Math.random().toString(36).substring(2);
        await supabase!.from('api_keys').insert({
          user_id: data.user.id,
          key: 'ovwi_' + newKey
        });

        setApiKey('ovwi_' + newKey);
      }

      if (keyData) {

      setApiKey(keyData.key);
    }
  };

  const runVerify = async () => {
    const session = await supabase!!.auth.getSession();
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
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-400 mb-6">{email}</p>

      {/* ✅ API KEY */}
      <div className="bg-[#0f172a] p-4 rounded-lg mb-6">
        <p className="text-gray-400 text-sm">Your API Key</p>
        <code className="block mt-2 text-sm">{apiKey || 'No key yet'}</code>
      </div>

      {/* ✅ USAGE */}
      <div className="bg-[#0f172a] p-4 rounded-lg">
        <div className="flex justify-between text-gray-400">
          <span>{usage} used</span>
          <span>{limit} limit</span>
        </div>

        <div className="w-full h-3 bg-[#1f2937] rounded mt-2">
          <div
            style={{ width: percent + '%' }}
            className="h-3 bg-blue-500 rounded"
          />
        </div>

        <p className="mt-2 text-gray-400">
          {limit - usage} remaining
        </p>
      </div>

      {/* ✅ ACTION */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={runVerify}
          className="px-6 py-3 bg-blue-500 rounded"
        >
          Run Test Request
        </button>

        <button
          onClick={() => window.location.href = '/upgrade'}
          className="px-6 py-3 border border-gray-600 rounded"
        >
          Upgrade
        </button>
      
<Console apiKey={apiKey} />

      {/* ✅ INFO */}

      <p className="mt-6 text-gray-500 text-sm">
        Test requests increase usage. Real API usage is tracked via your API key.
      </p>

    </div>
  );
}
