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
          Authorization: `Bearer ${apiKey || 'demo_key'}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'This is a very bad SEO text with poor structure and no keywords',
        }),
      });

      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
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
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/15 blur-3xl rounded-full"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header/Navbar */}
      <motion.nav
        className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer">
              OVWI
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/docs">
              <span className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
                Docs
              </span>
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <span className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer font-semibold">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={() => supabase?.auth.signOut().then(() => setUser(null))}
                  className="px-4 py-2 rounded-full border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-semibold transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 mb-8"
          variants={itemVariants}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Content optimization with AI
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Turn Content Into
          </span>
          <br />
          <span className="text-white">Traffic & Revenue</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400/80 mb-12 leading-relaxed"
          variants={itemVariants}
        >
          OVWI is an AI-powered API that rewrites and optimizes your content for SEO — 
          helping developers and creators generate more traffic, faster.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <Link href={user ? '/dashboard' : '/auth/login'}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all"
            >
              {user ? '🚀 Go to Dashboard' : '🚀 Get API Access'}
            </motion.button>
          </Link>
          <Link href="#demo">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm font-semibold text-lg hover:bg-white/10 transition-all"
            >
              See Demo
            </motion.button>
          </Link>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-slate-500"
          variants={itemVariants}
        >
          {user ? '✅ Logged in' : `Free tier • No credit card required • ${3 - demoCount} free demos left`}
        </motion.p>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Choose OVWI
        </motion.h2>

        <motion.p
          className="text-center text-slate-400 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          Everything you need to optimize content and boost SEO performance
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '⚡', title: 'Fast API', desc: 'Simple REST API you can integrate in minutes.' },
            { icon: '📈', title: 'Built for Growth', desc: 'Increase engagement, clarity and SEO performance instantly.' },
            { icon: '💸', title: 'Monetization Ready', desc: 'Use OVWI to power content tools or SaaS products.' },
            { icon: '🤖', title: 'AI-Powered', desc: 'Advanced NLP for intelligent content optimization.' },
            { icon: '⚙️', title: 'Developer Friendly', desc: 'Clear documentation and SDKs for all languages.' },
            { icon: '🔒', title: 'Enterprise Security', desc: 'Bank-grade encryption and compliance.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-cyan-500/10 hover:border-cyan-500/30 rounded-2xl p-6 transition-all"
              whileHover={{ y: -5, borderColor: 'rgb(34, 211, 238)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* DEMO */}
      <motion.section
        id="demo"
        className="relative z-10 max-w-4xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            See It in Action
          </motion.h2>
          <motion.p
            className="text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Try the API right now in your browser {!user && '(3 free demos)'}
          </motion.p>
        </div>

        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-cyan-500/20 rounded-2xl p-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Code */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-slate-400 mb-3">Code Example</p>
              <div className="relative bg-slate-950 border border-white/10 rounded-lg p-4 overflow-x-auto">
                <pre className="text-cyan-400 text-xs font-mono whitespace-pre-wrap">
                  {codeExample}
                </pre>
                <motion.button
                  onClick={copyCode}
                  whileHover={{ scale: 1.05 }}
                  className="absolute top-2 right-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-all"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </motion.div>

            {/* Response */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-slate-400 mb-3">Response</p>
              <div className="bg-slate-950 border border-white/10 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs text-emerald-400">
                {demoLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full"
                    />
                  </div>
                ) : apiResponse ? (
                  <pre className="whitespace-pre-wrap">{apiResponse}</pre>
                ) : (
                  <p className="text-slate-500">Click "Run Demo" to see the response...</p>
                )}
              </div>

              <motion.button
                onClick={runDemo}
                disabled={demoLoading || (!user && demoCount >= 3)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {demoLoading ? 'Running...' : !user && demoCount >= 3 ? 'Sign up for more demos' : 'Run Demo'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* PRICING */}
      <motion.section
        className="relative z-10 max-w-5xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple Pricing
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Free',
              price: '0',
              desc: 'For getting started',
              features: ['1,000 requests/month', 'Standard API access', 'Email support'],
              popular: false,
            },
            {
              name: 'Pro',
              price: '29',
              desc: 'For growing projects',
              features: ['50,000 requests/month', 'Advanced analytics', 'Priority support', 'API webhooks'],
              popular: true,
            },
            {
              name: 'Scale',
              price: '99',
              desc: 'For high volume',
              features: ['500,000 requests/month', 'Dedicated support', 'SLA guarantee', 'Custom features'],
              popular: false,
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.popular
                  ? 'bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border-cyan-500/50 ring-2 ring-cyan-500/30'
                  : 'bg-white/5 border-white/10 hover:border-cyan-500/30'
              }`}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-bold text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-slate-400 text-sm mt-1">{plan.desc}</p>
              <p className="text-4xl font-bold text-cyan-400 mt-4">${plan.price}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">+</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={user ? '/dashboard' : '/auth/login'} className="w-full mt-8 block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {user ? 'Manage' : 'Get Started'}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section
        className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to Optimize
        </motion.h2>

        <motion.p
          className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          Start optimizing your content with AI today. Join developers making real money with OVWI.
        </motion.p>

        <Link href={user ? '/dashboard' : '/auth/login'}>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all"
          >
            {user ? 'Go to Dashboard' : 'Start Free Now'}
          </motion.button>
        </Link>

        <p className="mt-4 text-sm text-slate-500">
          No credit card required • 1,000 free requests
        </p>
      </motion.section>
    </div>
  );
}
