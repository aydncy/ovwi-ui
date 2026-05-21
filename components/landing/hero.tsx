"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-120px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-250px] right-[-150px] h-[550px] w-[550px] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
        >
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          AI Verification Infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-7xl"
        >
          Enterprise AI Verification
          <br />
          Built For Trust.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl"
        >
          Real-time AI-powered identity verification infrastructure for
          enterprise platforms, fraud prevention systems, and next-generation
          trust networks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/dashboard"
            className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-[1.03]"
          >
            Launch Dashboard
          </Link>

          <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
            View API Docs
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            ["99.98%", "Verification Accuracy"],
            ["2.1M+", "API Requests Processed"],
            ["120ms", "Average Response Time"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
            >
              <div className="text-4xl font-black">{value}</div>
              <div className="mt-2 text-zinc-400">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
