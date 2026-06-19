'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sb } from '@/lib/supabase';

export default function Dashboard() {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    requests: 0,
    revenue: 0,
    users: 0,
    latency: 42,
  });

  const [events, setEvents] = useState<any[]>([]);

  async function loadData(userId: string) {

    // ✅ EVENTS ÇEK
    const { data } = await sb
      .from('api_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!data) return;

    setEvents(data);

    const totalRevenue = data.reduce((sum, e) => sum + Number(e.price), 0);
    const totalCalls = data.length;

    setStats({
      requests: totalCalls,
      revenue: totalRevenue,
      users: 1, // şimdilik sen
      latency: 42
    });
  }

  useEffect(() => {

    sb.auth.getUser().then(async ({ data }) => {

      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }

      setEmail(data.user.email || '');

      await loadData(data.user.id);

      setLoading(false);
    });

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="border-b border-white/10 px-6 py-4 flex justify-between">

        <div>
          <h1 className="text-xl font-bold">Your API Business</h1>
          <p className="text-xs text-slate-500">{email}</p>
        </div>

        <button
          onClick={() => sb.auth.signOut()}
          className="text-red-400 text-sm"
        >
          Sign Out
        </button>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">📊 API Calls</p>
            <h2 className="text-2xl font-bold">{stats.requests}</h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">💰 Revenue</p>
            <h2 className="text-2xl font-bold">
              ${stats.revenue.toFixed(2)}
            </h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">👤 Users</p>
            <h2 className="text-2xl font-bold">{stats.users}</h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">⚡ Latency</p>
            <h2 className="text-2xl font-bold">{stats.latency}ms</h2>
          </div>

        </div>

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded">

          <h3 className="mb-4">💸 Real Revenue Events</h3>

          {events.length === 0 && (
            <p className="text-slate-500 text-sm">
              No traffic yet — trigger an API call
            </p>
          )}

          <div className="space-y-2">

            {events.map((e, i) => (
              <div key={i} className="flex justify-between text-sm border-b border-white/5 pb-2">

                <span>{e.endpoint}</span>

                <span className="text-cyan-400 font-medium">
                  ${Number(e.price).toFixed(3)}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
