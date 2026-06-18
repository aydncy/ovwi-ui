'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const sections = {
    'getting-started': {
      title: 'Getting Started',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">1. Create an Account</h3>
            <p className="text-slate-300 mb-4">
              Sign up for free and get 50 API requests per month. No credit card required.
            </p>
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-all"
              >
                Create Account
              </motion.button>
            </Link>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">2. Get Your API Key</h3>
            <p className="text-slate-300 mb-4">
              After signing up, navigate to your dashboard to generate your API key.
            </p>
            <div className="bg-slate-900/50 border border-white/10 rounded-lg p-4">
              <code className="text-cyan-400 text-sm">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">3. Make Your First Request</h3>
            <p className="text-slate-300 mb-4">
              Use your API key to authenticate requests to the OVWI API.
            </p>
          </div>
        </div>
      ),
    },
    'authentication': {
      title: 'Authentication',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">API Key Authentication</h3>
            <p className="text-slate-300 mb-4">
              All API requests require authentication using your API key in the Authorization header.
            </p>

            <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-6 mt-4">
              <p className="text-sm text-slate-400 mb-3">Request Example:</p>
              <div className="relative">
                <pre className="text-cyan-400 text-sm overflow-x-auto">
{`curl -X POST https://api.ovwi.io/v1/process \\
  -H "Authorization: Bearer sk_live_abc123xyz" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Hello, world!"}'`}
                </pre>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => copyToClipboard('curl -X POST https://api.ovwi.io/v1/process \\', 'auth-1')}
                  className="absolute top-2 right-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-all"
                >
                  {copied === 'auth-1' ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Response Format</h3>
            <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-6">
              <pre className="text-emerald-400 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "req_123abc",
    "status": "completed",
    "result": "...",
    "timestamp": 1234567890
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    'endpoints': {
      title: 'API Endpoints',
      content: (
        <div className="space-y-8">
          {[
            {
              method: 'POST',
              endpoint: '/v1/process',
              description: 'Process your API request',
              color: 'emerald',
            },
            {
              method: 'GET',
              endpoint: '/v1/status',
              description: 'Check request status',
              color: 'blue',
            },
            {
              method: 'GET',
              endpoint: '/v1/usage',
              description: 'Get your usage statistics',
              color: 'purple',
            },
            {
              method: 'GET',
              endpoint: '/v1/balance',
              description: 'Check your account balance',
              color: 'orange',
            },
          ].map((ep, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className={`px-3 py-1 rounded font-bold text-sm bg-${ep.color}-500/20 text-${ep.color}-400`}>
                  {ep.method}
                </span>
                <code className="text-cyan-400 font-mono text-sm">{ep.endpoint}</code>
              </div>
              <p className="text-slate-300 text-sm">{ep.description}</p>
            </motion.div>
          ))}
        </div>
      ),
    },
    'rate-limits': {
      title: 'Rate Limiting',
      content: (
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Rate Limit Headers</h3>
            <p className="text-slate-300 mb-4">
              Every API response includes rate limit information in the headers.
            </p>

            <div className="space-y-3">
              {[
                { header: 'X-RateLimit-Limit', description: 'Total requests per month' },
                { header: 'X-RateLimit-Remaining', description: 'Requests remaining this month' },
                { header: 'X-RateLimit-Reset', description: 'Unix timestamp when limit resets' },
              ].map((h, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-900/50 border border-white/10 rounded-lg p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-cyan-400 font-mono font-bold text-sm">{h.header}</p>
                  <p className="text-slate-400 text-sm mt-1">{h.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Your Limits</h3>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-lg p-6">
              <p className="text-emerald-300 font-semibold">Free Plan: 50 requests/month</p>
              <p className="text-slate-400 text-sm mt-2">Upgrade to Pro for 2,000 requests or Scale for 10,000 requests.</p>
            </div>
          </div>
        </div>
      ),
    },
    'examples': {
      title: 'Code Examples',
      content: (
        <div className="space-y-8">
          {[
            {
              lang: 'JavaScript',
              code: `const response = await fetch('https://api.ovwi.io/v1/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_abc123xyz',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Hello, world!'
  })
});
const data = await response.json();
console.log(data);`,
            },
            {
              lang: 'Python',
              code: `import requests

response = requests.post(
  'https://api.ovwi.io/v1/process',
  headers={
    'Authorization': 'Bearer sk_live_abc123xyz',
    'Content-Type': 'application/json'
  },
  json={'prompt': 'Hello, world!'}
)

print(response.json())`,
            },
            {
              lang: 'cURL',
              code: `curl -X POST https://api.ovwi.io/v1/process \\
  -H "Authorization: Bearer sk_live_abc123xyz" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Hello, world!"}'`,
            },
          ].map((example, i) => (
            <motion.div
              key={i}
              className="bg-slate-900/50 border border-cyan-500/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-white/10">
                <span className="text-cyan-400 font-mono font-bold">{example.lang}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => copyToClipboard(example.code, `example-${i}`)}
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-slate-300 transition-all"
                >
                  {copied === `example-${i}` ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
              <pre className="text-slate-300 text-sm overflow-x-auto p-6">
                {example.code}
              </pre>
            </motion.div>
          ))}
        </div>
      ),
    },
    'support': {
      title: 'Support',
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-lg p-6"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-bold mb-3">Email Support</h3>
              <p className="text-slate-300 text-sm mb-4">
                Get help from our support team. Respond within 24 hours.
              </p>
              <a href="mailto:support@ovwi.io" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                support@ovwi.io
              </a>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-lg p-6"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-bold mb-3">Discord Community</h3>
              <p className="text-slate-300 text-sm mb-4">
                Join our community to share ideas and get help.
              </p>
              <a href="https://discord.gg/ovwi" className="text-blue-400 hover:text-blue-300 font-semibold">
                Join Discord
              </a>
            </motion.div>
          </div>

          <div className="bg-slate-900/50 border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">FAQ</h3>
            <div className="space-y-3">
              {[
                { q: 'How do I upgrade my plan?', a: 'Go to your dashboard settings to upgrade anytime.' },
                { q: 'Can I get a refund?', a: 'Yes, 30-day money-back guarantee.' },
                { q: 'Is there an SLA?', a: 'Enterprise plans include 99.9% uptime SLA.' },
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-3 last:border-0">
                  <p className="font-semibold text-cyan-400 mb-2">{faq.q}</p>
                  <p className="text-slate-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  };

  const sidebarItems = Object.keys(sections) as Array<keyof typeof sections>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
              OVWI Docs
            </h1>
          </Link>
          <p className="text-xs text-slate-400 mt-1">API Reference & Getting Started</p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          className="md:col-span-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="sticky top-24 space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Documentation</p>
            {sidebarItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  activeSection === item
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                {sections[item].title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="md:col-span-3"
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 rounded-2xl p-8">
            <h1 className="text-4xl font-bold mb-2 text-white">
              {sections[activeSection as keyof typeof sections].title}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded mb-8" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sections[activeSection as keyof typeof sections].content}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
