'use client';

import { motion } from 'framer-motion';

export default function WorkflowProof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Audit Trail
        </p>

        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Cryptographic Proof
        </h2>

        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          Every workflow execution creates a verifiable proof record with immutable audit metadata.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="gradient-border glow-primary mt-12 overflow-hidden"
      >
        <div className="border-b border-white/8 px-4 py-3">
          <span className="font-mono text-xs text-muted">
            proof-record.json
          </span>
        </div>

        <pre className="overflow-x-auto p-6 font-mono text-sm text-slate-300">
{`{
  "workflow_id": "wf_8f3d2a",
  "step": "process_payment",
  "status": "VERIFIED",
  "checksum": "sha256-e3b0c44298fc1c149afbf4...",
  "immutable_signature": "0x7f83ab19bc92",
  "compliance_tags": [
    "SOC2",
    "ISO27001"
  ]
}`}
        </pre>
      </motion.div>
    </section>
  );
}
