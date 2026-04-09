'use client';

import { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const apiKey = localStorage.getItem('ovwi_api_key');
    if (apiKey) window.location.href = '/dashboard';
  }, []);

  const handleLogin = async () => {
    if (!email) return;
    const apiKey = 'ovwi_live_' + Math.random().toString(36).substring(2);
    localStorage.setItem('ovwi_api_key', apiKey);
    localStorage.setItem('ovwi_user', JSON.stringify({ email }));
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0F1A]">
      <div className="bg-[#111827] p-8 rounded-xl shadow-xl w-[400px]">
        <h1 className="text-white text-2xl font-bold mb-2">
          Get your API key
        </h1>
        <p className="text-gray-400 mb-6">
          No password. No friction.
        </p>
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded bg-[#1F2937] text-white outline-none"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-cyan-500 px-4 rounded text-black font-semibold"
          >
            Get API Key
          </button>
        </div>
      </div>
    </div>
  );
}
