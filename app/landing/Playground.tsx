'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Loader2, RotateCcw } from 'lucide-react';

type LogLine = { text: string; tone: 'muted' | 'accent' | 'success' };

const steps: LogLine[] = [
  { text: '→ POST /api/workflow', tone: 'muted' },
  { text: '→ Request received', tone: 'muted' },
  { text: '→ Verifying signature', tone: 'accent' },
  { text: '→ Signature valid', tone: 'muted' },
  { text: '→ Executing workflow "payment"', tone: 'accent' },
  { text: '→ Recording execution logs', tone: 'muted' },
  { text: '✅ Verified & completed · 412ms', tone: 'success' },
];

export default function Playground() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = () => {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLogs([]);
    setDone(false);
    setRunning(true);

    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        if (i === steps.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, 450 * (i + 1));
      timers.current.push(t);
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLogs([]);
    setRunning(false);
    setDone(false);
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Live demo
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Workflow Execution Preview
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          Run a sample workflow and watch the verifiable execution trail stream in.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="gradient-border glow-primary mt-12 overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <span className="font-mono text-xs text-muted">ovwi · sandbox</span>
          <div className="flex items-center gap-2">
            {(logs.length > 0 || done) && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted transition hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
            <button
              onClick={run}
              disabled={running}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {running ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Running
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" /> Run Workflow
                </>
              )}
            </button>
          </div>
        </div>

        <div className="thin-scroll h-72 overflow-y-auto bg-black/30 p-5 font-mono text-sm">
          {logs.length === 0 && !running && (
            <p className="text-slate-500">Press “Run Workflow” to execute a sample run…</p>
          )}
          {logs.map((log, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={
                log.tone === 'success'
                  ? 'mt-1 font-semibold text-emerald-400'
                  : log.tone === 'accent'
                    ? 'mt-1 text-sky-300'
                    : 'mt-1 text-slate-400'
              }
            >
              {log.text}
            </motion.p>
          ))}
          {running && (
            <span className="cursor-blink mt-1 inline-block text-sky-400">▌</span>
          )}
        </div>
      </motion.div>
    </section>
  );
}
