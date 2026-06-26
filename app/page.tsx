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
    if (!user && demoCount >= 3) {
      setApiResponse('Free limit reached (3 calls)');
      return;
    }

    setDemoLoading(true);

    try {
      const res = await fetch('/api/ovwi', {
        method: 'POST',
        headers: {
          Authorization: apiKey ? "Bearer " + apiKey : "",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a very bad SEO text with poor structure'
        }),
      });

      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
      setDemoCount(p => p + 1);
    } catch {
      setApiResponse('Error');
    }

    setDemoLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl mb-4">OVWI AI API</h1>

      <div className="mb-6">
        <Link href={user ? "/dashboard" : "/auth/login"}>
          <button className="bg-cyan-500 px-4 py-2 text-black">
            {user ? "Dashboard" : "Get Access"}
          </button>
        </Link>
      </div>

      <div className="bg-black border p-4 mb-4 text-green-400 text-xs">
        {demoLoading ? "Running..." : apiResponse || "Run demo"}
      </div>

      <button onClick={runDemo} className="bg-cyan-500 text-black px-4 py-2">
        Run Demo
      </button>

    </div>
  );
}
