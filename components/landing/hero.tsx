"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
        >
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Enterprise AI Verification Infrastructure
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-black leading-tight text-transparent md:text-8xl"
        >
          Build Trust
          <br />
          Into Every API
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-8 max-w-2xl text-lg text-zinc-400 md:text-xl"
        >
          Enterprise-grade AI verification infrastructure with
          usage-based billing, fraud prevention, identity intelligence
          and scalable API architecture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/dashboard"
            className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:scale-[1.03]"
          >
            Launch Dashboard
          </Link>

          <Link
            href="/pricing"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-xl transition hover:bg-white/10"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Premium cards */}
        <div className="mt-24 grid w-full max-w-6xl gap-6 md:grid-cols-3">

          {[
            {
              title: "Verification API",
              desc: "Real-time enterprise verification infrastructure.",
            },
            {
              title: "Usage Billing",
              desc: "Usage-based scalable monetization engine.",
            },
            {
              title: "Trust Intelligence",
              desc: "Fraud scoring and identity intelligence layer.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
            >
              <div className="mb-4 text-xl font-bold">{item.title}</div>

              <div className="text-zinc-400">
                {item.desc}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
