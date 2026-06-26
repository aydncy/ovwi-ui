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
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);

      if (data?.user) {
        const { data: row } = await supabase
          .from('users_licenses')
          .select('api_key')
          .eq('user_id', data.user.id)
          .single();

        setApiKey(row?.api_key || null);
      }
    };

    load();
  }, [supabase]);

  const runDemo = async () => {
    if (!user && demoCount >= 3) return;

    setDemoLoading(true);

    try {
      const res = await fetch('/api/ovwi', {
        method: 'POST',
        headers: {
          Authorization: apiKey ? 'Bearer ' + apiKey : '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: 'This is a very bad SEO text with poor structure and no keywords'
        })
      });

      const data = await res.json();
      setApiResponse(data?.data?.optimized_text || JSON.stringify(data));
      setDemoCount(p => p + 1);
    } catch {
      setApiResponse('Error');
    }

    setDemoLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="text-center pt-28 pb-16">

        <h1 className="text-6xl font-bold mb-4">
          Turn Bad Content Into High-Ranking SEO Articles 🚀
        </h1>

        <p className="text-slate-400 mb-8">
          Paste your content → get optimized SEO version instantly
        </p>

        <Link href={user ? "/dashboard" : "/auth/login"}>
          <button className="px-6 py-3 bg-cyan-600 rounded-lg font-bold">
            {user ? "Go to Dashboard" : "Get API Access"}
          </button>
        </Link>

      </section>

      {/* DEMO */}
      <section className="max-w-4xl mx-auto px-6">

        <div className="border border-white/10 p-4 rounded-lg">

          <div className="min-h-[120px] text-emerald-300">
            {demoLoading ? "Running..." : apiResponse || "Click Run Demo"}
          </div>

          <button
            onClick={runDemo}
            className="mt-4 w-full py-3 bg-cyan-500 text-black rounded-lg font-bold"
          >
            🚀 Generate SEO Content
          </button>

        </div>

        <p className="text-center mt-4 text-sm text-slate-500">
          {Math.max(0, 3 - demoCount)} free demos left
        </p>

        {/* BEFORE AFTER */}
        {apiResponse && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">

            <div className="bg-red-500/10 p-5 rounded-xl">
              <p className="text-red-400 mb-2">Before</p>
              <p className="text-white/70">
                This is a very bad SEO text with poor structure and no keywords
              </p>
            </div>

            <div className="bg-green-500/10 p-5 rounded-xl">
              <p className="text-green-400 mb-2">After</p>
              <p className="text-green-300">
                {apiResponse}
              </p>
            </div>

          </div>
        )}

      </section>

      {/* PROBLEM */}
      <section className="max-w-5xl mx-auto mt-24 px-6 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Most Content Doesn't Rank
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white/5 p-6 rounded-xl">
            ❌ Poor SEO
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            ❌ No traffic
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            ❌ Wasted time
          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto mt-24 px-6 text-center">

        <h2 className="text-4xl font-bold mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 p-6 rounded-xl">
            1. Paste content
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            2. AI optimization
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            3. Get better ranking
          </div>

        </div>

      </section>

      {/* TRUST */}
      <section className="text-center mt-24 opacity-40">

        <p className="mb-4">Powered by</p>

        <div className="flex justify-center gap-10">
          <span>OpenAI</span>
          <span>API</span>
          <span>Developers</span>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center mt-24 pb-20">

        <h2 className="text-5xl font-bold mb-6">
          Start Optimizing Your Content Today
        </h2>

        <Link href={user ? "/dashboard" : "/auth/login"}>
          <button className="px-8 py-4 bg-cyan-600 rounded-lg font-bold text-lg">
            Start Free Now
          </button>
        </Link>

      </section>

    </div>
  );
}
