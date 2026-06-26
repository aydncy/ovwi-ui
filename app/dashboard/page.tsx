'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const supabase = getSupabase();

  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [plan, setPlan] = useState("free");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    if (!supabase) return;

    const load = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const { data: row } = await supabase
          .from('users_licenses')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        setUsage(row?.monthly_usage || 0);
        setLimit(row?.monthly_limit || 1000);
        setPlan(row?.plan || "free");
        setApiKey(row?.api_key || "");
      }
    };

    load();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-5xl font-bold mb-10">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="p-6 bg-white/5 rounded-xl">
          <p>Usage</p>
          <h2 className="text-3xl">{usage}</h2>
        </div>

        <div className="p-6 bg-white/5 rounded-xl">
          <p>Limit</p>
          <h2 className="text-3xl text-green-400">{limit}</h2>
        </div>

        <div className="p-6 bg-white/5 rounded-xl">
          <p>Plan</p>
          <h2 className="text-3xl text-yellow-400">{plan}</h2>
        </div>

      </div>

      <div className="bg-white/5 p-6 rounded-xl mb-10">
        <p className="mb-2">API Key</p>
        <div className="border p-3 rounded flex justify-between">
          <span className="text-xs">{apiKey}</span>
        </div>
      </div>

    </div>
  );
}
