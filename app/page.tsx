'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  const [usage, setUsage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const limit = 50;
  const percent = Math.min((usage / limit) * 100, 100);
  const blocked = usage >= limit;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function runRequest() {
    if (blocked) return;
    setUsage(u => u + 10);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen selection:bg-cyan-500/30 overflow-hidden">
      <Navbar />

      <main className="relative">
        {/* ANIMATED BACKGROUND ORBS */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-[20%] -left-[15%] w-[50%] h-[50%] bg-cyan-500/15 blur-[150px] rounded-full"
            animate={{
              x: Math.sin(scrollY * 0.001) * 100,
              y: Math.cos(scrollY * 0.001) * 100,
            }}
          />
          <motion.div
            className="absolute top-[15%] -right-[10%] w-[40%] h-[40%] bg-blue-600/12 blur-[150px] rounded-full"
            animate={{
              x: Math.cos(scrollY * 0.0008) * 80,
              y: Math.sin(scrollY * 0.0008) * 80,
            }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[10%] w-[35%] h-[35%] bg-purple-600/10 blur-[150px] rounded-full"
            animate={{
              x: Math.sin(scrollY * 0.0012) * 120,
            }}
          />

          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(34,211,238,0.15) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* HERO SECTION */}
        <motion.section
          className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-300 mb-8"
            variants={itemVariants}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Now with AI Usage Limits & Quota Management
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                Make Money
              </span>
              <br />
              <span className="text-white">
                from Your AI API
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400/80 mb-12 leading-relaxed"
            variants={itemVariants}
          >
            Track usage in real-time, enforce smart limits, and charge users
            automatically. Build a sustainable monetization layer in{" "}
            <span className="text-cyan-400 font-semibold">minutes</span>, not months.
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            variants={itemVariants}
          >
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all"
              >
                🚀 Start Free
              </motion.button>
            </Link>

            <Link href="/docs">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all"
              >
                📖 Documentation
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>

        {/* ANIMATED DEMO CARD */}
        <motion.section
          className="relative z-10 flex justify-center py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-2xl px-6">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl rounded-3xl opacity-30 -z-10" />

            <motion.div
              className="relative bg-gradient-to-br from-[#0A0A0A] via-[#0F0F1E] to-[#050510] border border-cyan-500/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
              whileHover={{ borderColor: "rgb(34, 211, 238)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <p className="text-sm text-cyan-400/80 font-semibold tracking-wider uppercase">
                  Live Monetization Engine
                </p>
                <h3 className="text-2xl font-bold mt-2 text-white">API Usage Tracker</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                  whileHover={{ y: -2, borderColor: "rgb(34, 211, 238)" }}
                >
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Total Requests</p>
                  <p className="text-2xl font-bold mt-2 text-cyan-400">{usage}</p>
                </motion.div>

                <motion.div
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                  whileHover={{ y: -2, borderColor: "rgb(34, 211, 238)" }}
                >
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Limit</p>
                  <p className="text-2xl font-bold mt-2 text-cyan-400">{limit}</p>
                </motion.div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300">Usage Progress</label>
                  <span className={`text-sm font-bold ${blocked ? "text-red-400" : "text-cyan-400"}`}>
                    {percent.toFixed(0)}%
                  </span>
                </div>

                <div className="relative w-full h-3 bg-slate-900/50 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className={`h-full rounded-full ${blocked ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-cyan-500 to-blue-600"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      boxShadow: blocked
                        ? "0 0 20px rgba(239, 68, 68, 0.5)"
                        : "0 0 20px rgba(34, 211, 238, 0.5)",
                    }}
                  />
                </div>
              </div>

              <motion.div
                className={`p-4 rounded-xl mb-6 border ${
                  blocked
                    ? "bg-red-500/10 border-red-500/30 text-red-300"
                    : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-sm font-medium">
                  {blocked
                    ? "⚠️ Usage limit reached! Upgrade to continue."
                    : "✅ API requests remaining. Keep building!"}
                </p>
              </motion.div>

              <motion.button
                onClick={runRequest}
                disabled={blocked}
                whileHover={!blocked ? { scale: 1.05, y: -2 } : {}}
                whileTap={!blocked ? { scale: 0.95 } : {}}
                className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                  blocked
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-pulse cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                }`}
              >
                {blocked ? "🔐 Upgrade Now" : "⚡ Run API Request"}
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* FEATURES SECTION */}
        <motion.section
          className="relative z-10 max-w-6xl mx-auto px-6 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Money Engine?
          </motion.h2>

          <motion.p
            className="text-center text-slate-400 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything you need to monetize your API, from tracking to billing.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Real-Time Analytics",
                desc: "Track every API call with millisecond precision",
              },
              {
                icon: "🛡️",
                title: "Smart Rate Limiting",
                desc: "Prevent abuse and protect your infrastructure",
              },
              {
                icon: "💳",
                title: "Automated Billing",
                desc: "Charge users automatically per usage",
              },
              {
                icon: "🌍",
                title: "Global Payouts",
                desc: "Withdraw earnings to 150+ countries",
              },
              {
                icon: "⚡",
                title: "Sub-100ms Latency",
                desc: "Built for performance-critical APIs",
              },
              {
                icon: "🔒",
                title: "Bank-Grade Security",
                desc: "SOC2 compliant with encrypted traffic",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-cyan-500/10 hover:border-cyan-500/30 rounded-2xl p-6 transition-all"
                whileHover={{
                  y: -5,
                  borderColor: "rgb(34, 211, 238)",
                  backgroundColor: "rgba(34, 211, 238, 0.05)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PRICING SECTION */}
        <motion.section
          className="relative z-10 max-w-5xl mx-auto px-6 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$0",
                desc: "For prototypes & testing",
                features: ["1M requests/mo", "Basic analytics", "Email support"],
                popular: false,
              },
              {
                name: "Pro",
                price: "$29",
                desc: "For growing APIs",
                features: ["50M requests/mo", "Advanced analytics", "Priority support", "Custom limits"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For scale & compliance",
                features: ["Unlimited requests", "Dedicated manager", "SLA guarantee", "Custom integrations"],
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`relative rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? "bg-gradient-to-br from-cyan-500/15 to-blue-600/15 border-cyan-500/50 ring-2 ring-cyan-500/30"
                    : "bg-white/5 border-white/10 hover:border-cyan-500/30"
                }`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-bold text-white">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{plan.desc}</p>
                <p className="text-4xl font-bold text-cyan-400 mt-4">{plan.price}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/auth/login" className="w-full mt-8 block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        : "bg-white/10 hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <motion.section
          className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Monetize?
          </motion.h2>

          <motion.p
            className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join 500+ developers who are already making money from their APIs with Money Engine.
          </motion.p>

          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all"
            >
              🚀 Create Free Account Today
            </motion.button>
          </Link>
        </motion.section>

        <div className="h-20" />
      </main>
    </div>
  );
}
