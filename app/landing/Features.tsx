'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ScrollText,
  Workflow,
  Code2,
  Network,
  FileCheck,
} from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verifiable Execution',
    desc: 'Every workflow step is validated and traceable, with cryptographic proof of what ran.',
  },
  {
    icon: ScrollText,
    title: 'Execution Logs',
    desc: 'Full, tamper-evident audit logs captured automatically for every single request.',
  },
  {
    icon: Workflow,
    title: 'Workflow Engine',
    desc: 'Define and run reliable multi-step processes with retries, branching, and state.',
  },
  {
    icon: Code2,
    title: 'API First',
    desc: 'Integrate easily into any backend with a clean REST API and typed SDKs.',
  },
  {
    icon: Network,
    title: 'Traceability',
    desc: 'Track every execution end-to-end across services with distributed run IDs.',
  },
  {
    icon: FileCheck,
    title: 'Compliance Ready',
    desc: 'Built for regulated environments — exportable evidence and retention controls.',
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Infrastructure
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Everything you need to trust your systems
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          OVWI gives every execution an audit trail — from the first request to the
          final verified result.
        </p>
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="gradient-border group p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-sky-500/20 to-blue-600/10 text-sky-300 transition group-hover:from-sky-500/30 group-hover:text-sky-200">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="mt-2 text-pretty leading-relaxed text-muted">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
