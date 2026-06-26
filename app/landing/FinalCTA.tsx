'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="gradient-border glow-primary relative overflow-hidden px-8 py-16 text-center sm:px-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(60% 80% at 50% 0%, rgba(56,189,248,0.18), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <h2 className="relative text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Start Building Trusted Systems
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted">
          Ship verifiable, auditable workflows your team and auditors can rely on.
        </p>
        <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:-translate-y-0.5 hover:shadow-blue-500/60"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-white/25 hover:bg-white/10"
          >
            Read the Docs
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
