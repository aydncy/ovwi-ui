'use client';

import { motion } from 'framer-motion';
import { Terminal, Zap, Lock } from 'lucide-react';

const codeLines: { tokens: { t: string; c?: string }[] }[] = [
  { tokens: [{ t: 'const', c: 'text-sky-400' }, { t: ' res = ' }, { t: 'await', c: 'text-sky-400' }, { t: ' ' }, { t: 'fetch', c: 'text-violet-300' }, { t: '(' }, { t: '"/api/workflow"', c: 'text-emerald-300' }, { t: ', {' }] },
  { tokens: [{ t: '  method: ' }, { t: '"POST"', c: 'text-emerald-300' }, { t: ',' }] },
  { tokens: [{ t: '  headers: {' }] },
  { tokens: [{ t: '    Authorization: ' }, { t: '"Bearer API_KEY"', c: 'text-emerald-300' }, { t: ',' }] },
  { tokens: [{ t: '  },' }] },
  { tokens: [{ t: '  body: ' }, { t: 'JSON', c: 'text-violet-300' }, { t: '.' }, { t: 'stringify', c: 'text-violet-300' }, { t: '({' }] },
  { tokens: [{ t: '    workflow: ' }, { t: '"payment"', c: 'text-emerald-300' }, { t: ',' }] },
  { tokens: [{ t: '    amount: ' }, { t: '100', c: 'text-amber-300' }] },
  { tokens: [{ t: '  }),' }] },
  { tokens: [{ t: '});' }] },
];

const highlights = [
  { icon: Zap, title: 'One request', desc: 'Trigger any workflow with a single authenticated call.' },
  { icon: Lock, title: 'Signed & verified', desc: 'Each execution returns a verifiable signature you can audit.' },
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
            No SDK lock-in. Call the OVWI API directly from your stack and get back a
            fully traceable, verified execution record.
          </p>

          <div className="mt-8 space-y-4">
            {highlights.map((h) => (
              <div key={h.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sky-300">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{h.desc}</p>
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
          className="gradient-border glow-primary overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
            <Terminal className="h-4 w-4 text-muted" />
            <span className="font-mono text-xs text-muted">execute-workflow.ts</span>
          </div>
          <pre className="thin-scroll overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
            <code>
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 select-none text-right text-slate-600" style={{ minWidth: '1.5rem' }}>
                    {i + 1}
                  </span>
                  <span>
                    {line.tokens.map((tok, j) => (
                      <span key={j} className={tok.c ?? 'text-slate-300'}>
                        {tok.t}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
