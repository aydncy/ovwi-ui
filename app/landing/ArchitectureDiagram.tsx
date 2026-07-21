'use client';

import { motion } from 'framer-motion';

const steps = [
  'Client',
  'OVWI API',
  'Verification',
  'Audit Record',
  'Proof Generation',
  'Verified',
];

export default function ArchitectureDiagram() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Architecture
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          How OVWI Works
        </h2>

        <p className="mt-4 text-lg text-slate-400">
          Every workflow execution becomes a verifiable audit trail.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-6">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="relative rounded-2xl border border-white/10 bg-slate-950/80 p-6 text-center"
          >
            <div className="font-semibold text-white">
              {step}
            </div>

            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-sky-400">
                →
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
