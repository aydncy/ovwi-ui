'use client';

import { motion } from 'framer-motion';
import { Zap, Lock } from 'lucide-react';
import CodeTabs from '@/components/CodeTabs';

const highlights = [
  {
    icon: Zap,
    title: 'One request',
    desc: 'Trigger any workflow with a single authenticated call.',
  },
  {
    icon: Lock,
    title: 'Signed & verified',
    desc: 'Each execution returns a verifiable signature you can audit.',
  },
];

export default function DeveloperSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
            Built for developers
          </p>

          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Drop it into any backend
          </h2>

          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
            No SDK lock-in. Call the OVWI API directly from your stack and get
            back a fully traceable, verified execution record.
          </p>

          <div className="mt-8 space-y-4">
            {highlights.map((h) => (
              <div key={h.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sky-300">
                  <h.icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {h.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-hidden"
        >
          <CodeTabs />
        </motion.div>
      </div>
    </section>
  );
}