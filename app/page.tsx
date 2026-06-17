'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/components/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden">

      {/* GLOW BACKGROUND */}
      <motion.div
        className="absolute -top-40 left-0 w-96 h-96 bg-blue-600/30 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-0 w-96 h-96 bg-purple-600/30 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto py-32 px-6">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >

          <h1 className="text-6xl font-bold leading-tight">
            Stop building APIs <br />
            <span className="text-blue-400">start scaling them</span>
          </h1>

          <p className="text-gray-400 text-lg">
            API infrastructure with limits, tracking and monetization built-in.
          </p>

          <div className="flex gap-4 mt-6">

            <motion.a
                
              className="bg-blue-600 px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {user ? 'Dashboard' : 'Get Started'}
            </motion.a>

            <motion.a
                
              className="border border-white/20 px-6 py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              Docs
            </motion.a>

          </div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <motion.div
            whileHover={{ rotate: 1, scale: 1.03 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur shadow-xl"
          >

            <p className="text-gray-400 text-sm">Usage</p>

            <div className="w-full h-3 bg-gray-800 rounded mt-2">
              <div className="w-2/3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              1300 / 2000 requests
            </p>

            <motion.button
              className="bg-green-600 px-4 py-2 rounded mt-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Upgrade
            </motion.button>

          </motion.div>

        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">

        {[
          "Track Usage",
          "Enforce Limits",
          "Monetize Instantly"
        ].map((title, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="card"
          >
            <h3 className="font-bold">{title}</h3>
            <p className="text-gray-400 mt-2">
              Core feature to scale your API
            </p>
          </motion.div>
        ))}

      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Start building today
        </motion.h2>

        <motion.a
          
          className="bg-blue-600 px-6 py-3 rounded-lg"
          whileHover={{ scale: 1.1 }}
        >
          Create Free Account
        </motion.a>

      </section>

    </div>
  );
}
