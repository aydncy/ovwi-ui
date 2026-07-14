'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUser } from '@/lib/useUser';

export default function DocsPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* STICKY NAVBAR */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-black text-white">
              O
            </div>
            <span className="font-bold tracking-tight text-white">OVWI</span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/docs" className="text-sky-400 font-medium">
              Docs
            </Link>
            {user ? (
              <Link href="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/login" className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-slate-200 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN DOCUMENTATION WRAPPER */}
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

          {/* SIDEBAR NAVIGATION */}
          <aside className="border-r border-white/10 pr-8">
            <div className="space-y-4 text-sm flex flex-col sticky top-28 h-fit">
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

          {/* MAIN DOCUMENTATION CONTENT */}
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
                <pre>
                  {`await fetch("/api/workflow", {
  method: "POST",
  headers: {
    Authorization: "Bearer API_KEY"
  },
  body: JSON.stringify({
    workflow: "payment_process",
    amount: 100
  })
});`}
                </pre>
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
                <pre>
                  {`{
  "workflow_id": "wf_8f3d2a",
  "status": "VERIFIED",
  "checksum": "sha256-...",
  "signature": "0x7f83ab...",
  "immutable": true
}`}
                </pre>
              </div>
            </section>

            <section id="api">
              <h2 className="text-3xl font-bold mb-4">
                API Reference
              </h2>
              <p className="text-slate-400">
                Detailed API endpoints, SDK usage guidelines, and parameter specifications will be detailed here.
              </p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
