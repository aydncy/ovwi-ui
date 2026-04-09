'use client';

import { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('ovwi_api_key');
    if (apiKey) window.location.href = '/dashboard';
  }, []);

  const sendMagic = async () => {
    if (!email) return;
    setLoading(true);

    await fetch('/api/auth/magic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    alert('Magic link sent');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[420px] p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
        <h1 className="text-2xl font-semibold mb-2">Get your API key</h1>
        <p className="text-sm opacity-70 mb-6">No password. No friction.</p>

        <input
          className="w-full p-3 rounded-lg bg-black/50 border border-white/10 mb-4"
          placeholder="you@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button
          onClick={sendMagic}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400"
        >
          {loading ? 'Sending...' : 'Get API Key'}
        </button>
      </div>
    </div>
  );
}
