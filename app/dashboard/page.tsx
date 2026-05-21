'use client';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [usage, setUsage] = useState(12);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setUser(data.user);
    });
  }, []);

  const runVerify = async () => {
    const res = await fetch('/api/verify', { method: 'POST' });
    const data = await res.json();
    setUsage(data.usage || usage + 1);
  };

  const percent = Math.min((usage / limit) * 100, 100);

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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400">Used</p>
            <p className="text-6xl font-bold mt-2">{usage}</p>
          </div>
          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400">Remaining</p>
            <p className="text-6xl font-bold mt-2 text-emerald-400">{limit - usage}</p>
          </div>
          <div className="glass rounded-3xl p-8">
            <p className="text-zinc-400">Plan</p>
            <p className="text-5xl font-bold mt-2">Free</p>
          </div>
        </div>

        {/* Usage Bar */}
        <div className="glass rounded-3xl p-10 mb-12">
          <h3 className="mb-6 text-xl">Monthly Usage</h3>
          <div className="h-4 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="text-right mt-3 text-sm text-zinc-400">{usage} / {limit} requests</p>
        </div>

        {/* Upgrade Section */}
        <div className="glass rounded-3xl p-10">
          <h3 className="text-3xl font-bold mb-8">Upgrade Plan</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Pro", price: "€6", checkout: CHECKOUTS.pro },
              { name: "Enterprise", price: "€18", checkout: CHECKOUTS.enterprise },
              { name: "Scale", price: "€49", checkout: CHECKOUTS.scale }
            ].map(plan => (
              <div key={plan.name} className="glass p-8 rounded-3xl text-center hover:border-purple-500/50 transition border border-white/10">
                <h4 className="text-2xl font-semibold">{plan.name}</h4>
                <p className="text-5xl font-bold my-6">{plan.price}<span className="text-base font-normal">/mo</span></p>
                <button 
                  onClick={() => window.location.href = plan.checkout}
                  className="primary-btn w-full py-4 rounded-2xl"
                >
                  Upgrade
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
