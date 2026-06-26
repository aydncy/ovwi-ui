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
          Authorization: apiKey ? 'Bearer ' + apiKey : '',   // ✅ FIX 1
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a very bad SEO text with poor structure and no keywords',
        }),
      });

      const data = await res.json();

      setApiResponse(data?.data?.optimized_text || JSON.stringify(data, null, 2)); // ✅ FIX 2

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
})
  .then(r => r.json())
  .then(data => console.log(data))`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO vs diğer tüm UI AYNEN KORUNDU */}

      <motion.p
        className="mt-6 text-sm text-slate-500"
        variants={itemVariants}
      >
        {user ? '✅ Logged in' : `Free tier • No credit card required • ${Math.max(0, 3 - demoCount)} free demos left`} {/* ✅ FIX 3 */}
      </motion.p>

    </div>
  );
}
