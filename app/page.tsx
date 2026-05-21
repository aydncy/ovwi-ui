'use client';
import Navbar from '../components/Navbar';
import { createSupabaseClient } from '@/lib/supabase-browser';
import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState({ usage: 0, remaining: 50 });

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    const res = await fetch('/api/usage');
    const data = await res.json();
    setUsageData(data);
  };

  const verify = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/verify', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }) 
      });
      const data = await res.json();
      setResult(data);
      fetchUsage(); // Güncelle
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-7xl font-black tracking-tighter mb-6">
            Trust at<br />
            <span className="text-gradient">Enterprise Speed</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass p-10 rounded-3xl">
            <h3 className="text-2xl mb-6">Try Live Verification</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aydinceylan07@gmail.com"
              className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 mb-6 text-lg"
            />
            <button 
              onClick={verify}
              disabled={loading}
              className="primary-btn w-full py-5 rounded-2xl text-xl"
            >
              {loading ? 'Verifying...' : 'Verify Identity'}
            </button>

            {result && (
              <pre className="mt-6 p-6 bg-black/70 rounded-2xl text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>

          <div className="glass p-10 rounded-3xl flex flex-col justify-center">
            <h3 className="text-xl mb-4">Current Quota</h3>
            <p className="text-7xl font-bold text-emerald-400">{usageData.remaining}</p>
            <p className="text-2xl text-zinc-400">remaining</p>
            <p className="mt-6 text-zinc-400">{usageData.usage} / 50 used this month</p>
          </div>
        </div>
      </section>
    </>
  );
}
