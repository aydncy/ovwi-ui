'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

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

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* NAVBAR */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6">

          <Link href="/">
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OVWI
            </span>
          </Link>

          <div className="flex gap-6 text-sm text-slate-300">
            <Link href="/docs">Docs</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>

        </div>
      </div>

      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center py-24 px-6">

        <p className="text-xs text-cyan-400 mb-4">
          Open Verifiable Workflow Infrastructure
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Build Verifiable <br /> Workflows
        </h1>

        <p className="text-slate-400 mb-10 max-w-lg mx-auto">
          Execute, verify and audit workflows across your systems.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold">
              Start Building
            </button>
          </Link>

          <button
            onClick={runWorkflow}
            className="px-6 py-3 border border-white/20 rounded-lg"
          >
            Run Demo
          </button>
        </div>

      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-4 mb-20">
        {[
          "Verifiable execution logs",
          "Audit-ready workflows",
          "Deterministic processing",
          "API-first architecture",
          "System traceability",
          "Compliance ready"
        ].map((item, i) => (
          <div key={i} className="bg-white/5 p-4 rounded-lg">
            {item}
          </div>
        ))}
      </div>

      {/* LOG PANEL */}
      <div className="max-w-3xl mx-auto px-6 pb-20">

        <div className="bg-black border border-white/10 rounded-lg p-6 font-mono text-sm min-h-[180px]">

          {loading && <p>Running...</p>}

          {!loading && logs.length === 0 && (
            <p className="text-slate-500">Run workflow to see logs</p>
          )}

          {logs.map((l, i) => (
            <p key={i} className="text-emerald-400">{l}</p>
          ))}

        </div>

      </div>

    </div>
  );
}
