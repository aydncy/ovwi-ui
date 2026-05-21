'use client';
import Navbar from '../../components/Navbar';
import { createSupabaseClient } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [usageData, setUsageData] = useState({ usage: 0, remaining: 50, limit: 50 });
  const supabase = createSupabaseClient();

  const fetchUsage = async () => {
    const res = await fetch('/api/usage');
    const data = await res.json();
    setUsageData(data);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setUser(data.user);
      fetchUsage();
    });
  }, [supabase]);

  const runVerify = async () => {
    const res = await fetch('/api/verify', { method: 'POST' });
    await res.json();
    fetchUsage(); // Refresh usage
  };

  return (
    <>
      <Navbar />
      <div className="pt-28 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter">Dashboard</h1>
            <p className="text-zinc-400 mt-2">{user?.email}</p>
          </div>
          <button onClick={runVerify} className="primary-btn px-10 py-4 rounded-2xl text-lg">
            Run Verification
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-3xl">
            <p className="text-zinc-400">Used</p>
            <p className="text-6xl font-bold mt-2">{usageData.usage}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <p className="text-zinc-400">Remaining</p>
            <p className="text-6xl font-bold mt-2 text-emerald-400">{usageData.remaining}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <p className="text-zinc-400">Limit</p>
            <p className="text-5xl font-bold mt-2">{usageData.limit}</p>
          </div>
        </div>

        <div className="glass p-10 rounded-3xl">
          <h3 className="mb-6">Usage Progress</h3>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all" 
                 style={{ width: `${(usageData.usage / usageData.limit) * 100}%` }} />
          </div>
        </div>
      </div>
    </>
  );
}
