'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const runWorkflow = async () => {
    setLoading(true);
    setLogs([]);

    const steps = [
      "→ Request received",
      "→ Verifying signature",
      "→ Executing workflow",
      "→ Recording logs",
      "✅ Verified & completed"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setLogs(prev => [...prev, steps[i]]);
    }

    setLoading(false);
  };

  const codeExample = `fetch("https://ovwi.cyzora.com/api/workflow", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    workflow: "payment_process",
    payload: { amount: 100 }
  })
})`;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/15 blur-3xl rounded-full"
          animate={{ y: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full"
          animate={{ y: [0, -40, 0] }} transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* NAVBAR */}
      <motion.nav className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OVWI
            </h1>
          </Link>

          <div className="flex gap-4 items-center">
            <Link href="/docs"><span className="text-slate-400 hover:text-white">Docs</span></Link>
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-cyan-600 rounded-full font-semibold">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-32 text-center">

        <p className="text-cyan-400 text-xs mb-6">
          Open Verifiable Workflow Infrastructure
        </p>

        <h1 className="text-7xl font-bold mb-6">
          Build Verifiable <br />
          Workflows
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto mb-10">
          Execute, verify and audit workflows across your systems.
          OVWI provides infrastructure-level trust for automation.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold">
              Start Building
            </button>
          </Link>

          <button
            onClick={runWorkflow}
            className="px-8 py-4 border border-white/20 rounded-full"
          >
            Run Demo
          </button>
        </div>

      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          "Verifiable execution logs",
          "Audit-ready workflows",
          "Deterministic processing",
          "API-first architecture",
          "System-wide traceability",
          "Compliance infrastructure"
        ].map((t,i)=>(
          <div key={i} className="bg-white/5 p-6 rounded-xl">
            {t}
          </div>
        ))}
      </section>

      {/* PLAYGROUND */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20">

        <div className="bg-slate-900 p-6 rounded-xl mb-6">
          <pre className="text-cyan-400 text-sm">{codeExample}</pre>
        </div>

        <div className="bg-black border border-white/10 rounded-xl p-6 h-64 overflow-auto font-mono text-sm">
          {loading ? (
            <p>Running...</p>
          ) : logs.length ? (
            logs.map((l,i)=>(
              <p key={i} className="text-emerald-400">{l}</p>
            ))
          ) : (
            <p className="text-slate-500">Run workflow to see logs</p>
          )}
        </div>

      </section>

      {/* CTA */}
      <section className="text-center pb-32">
        <h2 className="text-5xl font-bold mb-6">
          Start Building Trusted Systems
        </h2>

        <Link href="/dashboard">
          <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold">
            Open Dashboard
          </button>
        </Link>
      </section>

    </div>
  );
}
