'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSupabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const supabase = getSupabase();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    requests: 12543,
    revenue: 2847.50,
    users: 89,
    latency: 47,
  });

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setEmail(data.user.email || '');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full"
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OVWI Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">{email}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => supabase?.auth.signOut()}
            className="px-6 py-2 rounded-full border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-300 transition-all text-sm font-semibold"
          >
            Sign Out
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              label: "Total Requests",
              value: stats.requests.toLocaleString(),
              icon: "📊",
              trend: "+12.5%",
              color: "cyan",
            },
            {
              label: "Revenue (€)",
              value: `€${stats.revenue.toFixed(2)}`,
              icon: "💰",
              trend: "+8.2%",
              color: "emerald",
            },
            {
              label: "Active Users",
              value: stats.users,
              icon: "👥",
              trend: "+5",
              color: "blue",
            },
            {
              label: "Avg Latency (ms)",
              value: stats.latency,
              icon: "⚡",
              trend: "-3ms",
              color: "purple",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`relative bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/5 border border-${stat.color}-500/20 rounded-2xl p-6 overflow-hidden group hover:border-${stat.color}-500/50 transition-all`}
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "rgb(34, 211, 238)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10 flex items-start justify-between mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-white">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>

              <motion.p
                className="text-xs font-semibold text-emerald-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {stat.trend}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Revenue Chart */}
          <motion.div
            className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-cyan-500/20 rounded-2xl p-8"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold mb-6">Revenue This Month</h3>
            <div className="flex items-end gap-2 h-40">
              {[40, 60, 35, 80, 55, 90, 70, 85, 40, 75, 60, 88].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t opacity-70 hover:opacity-100 transition-all cursor-pointer relative group"
                  style={{ height: `${h}%` }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500/20 border border-cyan-500/50 rounded px-2 py-1 text-xs font-semibold text-cyan-300 whitespace-nowrap pointer-events-none">
                    €{Math.round(Math.random() * 500)}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Last 12 days</p>
          </motion.div>

          {/* Requests Chart */}
          <motion.div
            className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-blue-500/20 rounded-2xl p-8"
            variants={itemVariants}
          >
            <h3 className="text-lg font-bold mb-6">API Requests</h3>
            <div className="space-y-4">
              {[
                { label: "Successful", value: 95, color: "emerald" },
                { label: "Rate Limited", value: 3, color: "yellow" },
                { label: "Failed", value: 2, color: "red" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-slate-300">{item.label}</p>
                    <p className="text-sm font-bold text-slate-400">{item.value}%</p>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6">Today</p>
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 rounded-2xl p-8"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold mb-6">Recent API Calls</h3>
          <div className="space-y-3">
            {[
              { user: "user_89...21", endpoint: "POST /api/v1/generate", status: "200", time: "2m ago" },
              { user: "user_12...44", endpoint: "GET /api/v1/balance", status: "200", time: "5m ago" },
              { user: "user_45...90", endpoint: "POST /api/v1/process", status: "429", time: "8m ago" },
              { user: "user_67...12", endpoint: "GET /api/v1/status", status: "200", time: "12m ago" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-xs font-mono text-slate-400">{item.user}</span>
                  <span className="text-sm text-slate-300">{item.endpoint}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      item.status === "200"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
