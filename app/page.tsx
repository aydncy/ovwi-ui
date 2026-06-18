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
    const handleMouseMove = (e: MouseEvent) => {
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
    setUsage((u) => u + 10);
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      <Navbar />

      <main>

        {/* HERO */}
        <section className="text-center pt-32 space-y-6">

          <h1 className="text-6xl md:text-8xl font-bold">
            Make Money
            <br />
            <span className="text-cyan-400">from Your API</span>
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto">
            Track usage, enforce limits and charge users automatically.
          </p>

          <div className="flex justify-center gap-4">

            <Link href="/auth/login">
              <button className="px-6 py-3 bg-cyan-500 rounded-lg">
                🚀 Start Free
              </button>
            </Link>

            <Link href="/docs">
              <button className="px-6 py-3 border border-white/20 rounded-lg">
                Docs
              </button>
            </Link>

          </div>

        </section>

        {/* DEMO */}
        <section className="flex justify-center mt-16">

          <motion.div
            className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl w-[400px]"
            animate={{ y: Math.sin(scrollY * 0.01) * 5 }}
          >

            <p className="text-center text-sm text-gray-400">
              Live Demo
            </p>

            <div className="w-full h-2 bg-gray-800 rounded mt-4">
              <motion.div
                className={blocked ? "bg-red-500 h-2" : "bg-cyan-500 h-2"}
                animate={{ width: percent + "%" }}
              />
            </div>

            <p className="text-center text-xs mt-2">
              {usage} / {limit}
            </p>

            <button
              onClick={runRequest}
              className="mt-4 w-full bg-cyan-600 py-2 rounded"
            >
              {blocked ? "Upgrade" : "Run Request"}
            </button>

          </motion.div>

        </section>

        {/* CTA */}
        <section className="text-center mt-24 pb-24">

          <h2 className="text-3xl mb-6">
            Start making money
          </h2>

          <Link href="/auth/login">
            <button className="px-8 py-3 bg-cyan-500 rounded-lg">
              🚀 Create Account
            </button>
          </Link>

        </section>

      </main>

    </div>
  );
}
