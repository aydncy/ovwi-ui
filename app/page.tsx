'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSupabase } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';

export default function Home() {
  const supabase = getSupabase();
  const [copied, setCopied] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [demoCount, setDemoCount] = useState(0);

  useEffect(() => {
    if (!supabase) return;

    const load = async () => {
      try {
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
      } catch (err) {
        console.error('Auth load error:', err);
      }
    };

    load();
  }, [supabase]);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runDemo = async () => {
    if (!user && demoCount >= 3) {
      setApiResponse('Free limit reached (3 calls). Sign up to get unlimited access.');
      return;
    }

    if (!apiKey && user) {
      setApiResponse('No API key found. Contact support.');
      return;
    }

    setDemoLoading(true);

    try {
      const res = await fetch('/api/ovwi', {
        method: 'POST',
        headers: {
          Authorization: apiKey ? 'Bearer ' + apiKey : '', // ✅ FIX
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a very bad SEO text with poor structure and no keywords',
        }),
      });

      const data = await res.json();

      // ✅ FIX: JSON yerine gerçek output göster
      setApiResponse(data?.data?.optimized_text || JSON.stringify(data, null, 2));

      setDemoCount(prev => prev + 1);

    } catch (err) {
      setApiResponse(JSON.stringify({ error: 'API Error', message: String(err) }, null, 2));
    }

    setDemoLoading(false);
  };

  const codeExample = `fetch("https://ovwi.cyzora.com/api/ovwi", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: "your content"
  })
})`;

  return (
    <div className="min-h-screen bg-black text-white">

      <h1 className="text-6xl text-center mt-20">Rank Higher with AI 🚀</h1>

      <p className="text-center text-gray-400 mt-4">
        AI API that rewrites your content for SEO and traffic.
      </p>

      <div className="flex justify-center mt-6">
        <Link href={user ? "/dashboard" : "/auth/login"}>
          <button className="bg-cyan-500 text-black px-6 py-3 rounded">
            {user ? "Go to Dashboard" : "Get API Access"}
          </button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto mt-10 border p-4 text-green-400 text-xs">

        {demoLoading ? "Running..." : apiResponse || "Click Run Demo"}

        <button
          onClick={runDemo}
          className="mt-4 block w-full bg-cyan-500 text-black py-2"
        >
          Run Demo
        </button>

      </div>

      <p className="text-center mt-6 text-sm text-gray-500">
        {/* ✅ FIX */}
        {Math.max(0, 3 - demoCount)} free demos left
      </p>

    </div>
  );
}
