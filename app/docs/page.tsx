import LandingNav from '../landing/LandingNav';
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DocsPage() {
  return (
<>
  <LandingNav />
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-16">
          <p className="text-sky-400 text-sm uppercase tracking-widest">
            Documentation
          </p>

          <h1 className="mt-4 text-6xl font-bold">
            OVWI Docs
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            Run, verify and audit workflow executions across distributed systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">

          <aside className="border-r border-white/10 pr-8">
            <div className="space-y-4 text-sm flex flex-col">
              <Link href="#getting-started" className="block text-slate-300 hover:text-white transition">
                Getting Started
              </Link>

              <Link href="#auth" className="block text-slate-300 hover:text-white transition">
                Authentication
              </Link>

              <Link href="#workflows" className="block text-slate-300 hover:text-white transition">
                Workflows
              </Link>

              <Link href="#logs" className="block text-slate-300 hover:text-white transition">
                Execution Logs
              </Link>

              <Link href="#audit" className="block text-slate-300 hover:text-white transition">
                Audit Records
              </Link>

              <Link href="#proofs" className="block text-slate-300 hover:text-white transition">
                Verification Proofs
              </Link>

              <Link href="#api" className="block text-slate-300 hover:text-white transition">
                API Reference
              </Link>
            </div>
          </aside>

          <main className="space-y-20">

            <section id="getting-started">
              <h2 className="text-3xl font-bold mb-4">
                Getting Started
              </h2>

              <p className="text-slate-400">
                OVWI provides verifiable workflow infrastructure with
                execution tracking, audit records and proof generation.
              </p>
            </section>

            <section id="auth">
              <h2 className="text-3xl font-bold mb-4">
                Authentication
              </h2>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 font-mono text-sm">
                Authorization: Bearer YOUR_API_KEY
              </div>
            </section>

            <section id="workflows">
              <h2 className="text-3xl font-bold mb-4">
                Execute Workflow
              </h2>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 font-mono text-sm overflow-x-auto">
{`await fetch("/api/workflow", {
  method: "POST",
  headers: {
    Authorization: "Bearer API_KEY"
  },
  body: JSON.stringify({
    workflow: "payment_process",
    amount: 100
  })
})`}
              </div>
            </section>

            <section id="logs">
              <h2 className="text-3xl font-bold mb-4">
                Execution Logs
              </h2>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 font-mono text-sm">
                <p>→ Request received</p>
                <p>→ Verifying signature</p>
                <p>→ Executing workflow</p>
                <p>→ Recording logs</p>
                <p className="text-emerald-400">
                  ✅ Verified
                </p>
              </div>
            </section>

            <section id="audit">
              <h2 className="text-3xl font-bold mb-4">
                Audit Records
              </h2>

              <p className="text-slate-400">
                Every execution creates a permanent audit record
                with timestamps and verification metadata.
              </p>
            </section>

            <section id="proofs">
              <h2 className="text-3xl font-bold mb-4">
                Verification Proof
              </h2>

              <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 font-mono text-sm overflow-x-auto">
{`{
  "workflow_id":"wf_8f3d2a",
  "status":"VERIFIED",
  "checksum":"sha256-...",
  "signature":"0x7f83ab...",
  "immutable":true
}`}
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
