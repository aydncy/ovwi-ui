"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] h-[600px] w-[600px] bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[600px] w-[600px] bg-fuchsia-500/20 blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff1_1px,transparent_1px),linear-gradient(to_bottom,#fff1_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl"
        >
          Enterprise AI Verification Infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold leading-tight md:text-7xl"
        >
          Trust Infrastructure
          <br />
          for the AI Economy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-zinc-400"
        >
          Real-time verification API for enterprises.
          Fraud prevention, identity validation, AI trust scoring.
        </motion.p>

        <div className="mt-10 flex gap-4">
          <Button>Launch Dashboard</Button>
          <Button variant="secondary">View API</Button>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            ["99.98%", "Accuracy"],
            ["120ms", "Latency"],
            ["2.1M+", "Requests"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-3xl font-bold">{v}</div>
              <div className="text-zinc-400">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
