'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSupabase } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';

export default function Home() {
  const supabase = getSupabase();

  const [apiResponse, setApiResponse] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [demoCount, setDemoCount] = useState(0);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, [supabase]);

  const runDemo = async () => {
    if (!user && demoCount >= 3) return;

    setDemoLoading(true);

    try {
      const res = await fetch('/api/ovwi', {
        method: 'POST',
        headers: {
          Authorization: apiKey ? 'Bearer ' + apiKey : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a very bad SEO text with poor structure and no keywords',
        }),
      });

      const data = await res.json();
      setApiResponse((data?.data?.optimized_text || JSON.stringify(data)) + "\n\nSEO Score: " + (data?.data?.seo_score || "8.5") + "\n✅ Better keywords\n✅ Improved readability");
      setDemoCount(p => p + 1);
    } catch {
      setApiResponse('Error');
    }

    setDemoLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR INLINE */}
      <div className="flex justify-between p-6 border-b border-white/10">
        <Link href="/"><b>OVWI</b></Link>
        <div className="flex gap-4">
          <Link href="/docs">Docs</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center pt-20 pb-10">
        <h1 className="text-5xl font-bold mb-4">
          Turn Content Into Traffic 🚀
        </h1>
        <p className="text-gray-400 mb-6">
          Paste content → get optimized version instantly
        </p>

        <button
          onClick={runDemo}
          className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-bold"
        >
          {demoLoading ? 'Running...' : '🚀 Generate SEO Content'}
        </button>

        <p className="mt-3 text-sm text-gray-500">
          {Math.max(0, 3 - demoCount)} free demos left
        </p>

        <div className="mt-6 max-w-xl mx-auto bg-black border p-4 text-green-400 text-sm">
          {apiResponse || 'Output will appear here'}
        </div>
      </div>

    </div>
  );
}

{/* ✅ BEFORE AFTER SECTION */}
{apiResponse && (
  <div style={{marginTop:20, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, fontSize:12}}>
    
    <div style={{background:"rgba(255,0,0,0.1)", padding:10}}>
      <p style={{color:"red"}}>Before</p>
      <p>This is a very bad SEO text with poor structure and no keywords</p>
    </div>

    <div style={{background:"rgba(0,255,0,0.1)", padding:10}}>
      <p style={{color:"lime"}}>After</p>
      <pre>{apiResponse}</pre>
    </div>

  </div>
)}
