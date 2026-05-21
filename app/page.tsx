'use client';
import Navbar from '../components/Navbar';
import { createSupabaseClient } from '@/lib/supabase-browser';
import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [usageData, setUsageData] = useState({ usage: 0, remaining: 50 });

  const supabase = createSupabaseClient();

  // Her yüklenişte gerçek usage'ı çek
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
      fetchUsage(); // Kullanımı güncelle
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
            Trust at<br />
            <span className="text-gradient">Enterprise Speed</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass p-10 rounded-3xl">
            <h3 className="text-xl mb-6">Try Live Verification</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 mb-6"
            />
            <button 
              onClick={verify}
              disabled={loading}
              className="primary-btn w-full py-4 rounded-2xl text-lg"
            >
              {loading ? 'Verifying...' : 'Verify Identity'}
            </button>

            {result && (
              <pre className="mt-6 p-6 bg-black/60 rounded-2xl overflow-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>

          <div className="glass p-10 rounded-3xl">
            <h3 className="text-xl mb-4">Current Usage</h3>
            <p className="text-6xl font-bold">{usageData.remaining} <span className="text-2xl text-zinc-400">remaining</span></p>
            <p className="text-sm text-zinc-400 mt-2">{usageData.usage} / 50 used</p>
          </div>
        </div>
      </section>
    </>
  );
}
