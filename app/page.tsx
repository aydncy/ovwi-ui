'use client';
import Navbar from './components/Navbar';
import { CHECKOUTS } from '@/lib/checkout';
import { supabase } from '@/lib/supabase-browser';
import { useState, useEffect } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
  }, []);

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
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Enterprise Speed</span>
          </h1>
          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto">
            AI-powered identity verification infrastructure for serious companies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-10">
            <div className="glass rounded-3xl p-10">
              <h3 className="text-xl mb-6">Try Live Verification</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 mb-4 focus:outline-none focus:border-purple-500"
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
          </div>

          {/* Right Side - Stats */}
          <div className="space-y-6">
            {[
              { num: "99.97%", label: "Accuracy" },
              { num: "180ms", label: "Avg Response" },
              { num: "∞", label: "Scale" }
            ].map((s, i) => (
              <div key={i} className="glass rounded-3xl p-8 flex justify-between items-center">
                <div className="text-6xl font-bold text-white/90">{s.num}</div>
                <div className="text-right">
                  <div className="text-purple-400 text-sm tracking-widest">METRIC</div>
                  <div className="text-2xl">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
