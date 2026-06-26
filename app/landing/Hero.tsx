'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const heroLogs = [
  { text: 'Request received', tone: 'muted' },
  { text: 'Verifying signature', tone: 'muted' },
  { text: 'Executing workflow', tone: 'accent' },
  { text: 'Recording logs', tone: 'muted' },
  { text: 'Verified', tone: 'success' },
];

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 pt-36 pb-24 lg:flex-row lg:items-center lg:gap-10 lg:pt-44">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex-1 text-center lg:text-left"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-300 backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5" />
          Open Verifiable Workflow Infrastructure
        </div>

        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Build <span className="text-gradient-accent">Verifiable</span> Workflows
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted lg:mx-0">
          Run, verify, and audit every execution across your systems. Infrastructure
          for teams that need to prove what happened — not just hope it did.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5 hover:shadow-blue-500/60"
          >
            Start Building
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-white/25 hover:bg-white/10"
          >
            View Docs
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted lg:justify-start">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> SOC 2 friendly
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Tamper-evident logs
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> API first
          </span>
        </div>
      </motion.div>

      {/* Right — system panel */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="w-full max-w-md flex-1"
      >
        <div className="gradient-border glow-primary float-slow overflow-hidden">
          {/* window bar */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-xs text-muted">workflow · execution</span>
          </div>

          <div className="space-y-3 p-5 font-mono text-sm">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>run_id</span>
              <span className="text-sky-300">wf_8f3a··2c91</span>
            </div>
            <div className="h-px bg-white/8" />
            {heroLogs.map((log, i) => (
              <motion.div
                key={log.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.35, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                {log.tone === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <span
                    className={`text-base leading-none ${
                      log.tone === 'accent' ? 'text-sky-400' : 'text-slate-500'
                    }`}
                  >
                    →
                  </span>
                )}
                <span
                  className={
                    log.tone === 'success'
                      ? 'font-semibold text-emerald-400'
                      : log.tone === 'accent'
                        ? 'text-foreground'
                        : 'text-slate-400'
                  }
                >
                  {log.text}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + heroLogs.length * 0.35 }}
              className="mt-4 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs"
            >
              <span className="text-emerald-300">signature valid · 200 OK</span>
              <span className="font-semibold text-emerald-400">412ms</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
