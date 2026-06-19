'use client';

import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);

  const LIMIT = 1000;

  useEffect(() => {
    async function load() {

      const { data } = await sb.auth.getUser();

      if (!data.user) {
        location.href = "/auth/login";
        return;
      }

      setUser(data.user);

      const { data: ev } = await sb
        .from("api_events")
        .select("*")
        .eq("user_id", data.user.id);

      setEvents(ev || []);
    }

    load();
  }, []);

  const calls = events.length;
  const revenue = events.reduce((s, e) => s + Number(e.price), 0);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-5xl px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-2xl font-bold">
            Your API Business
          </h1>

          <p className="text-sm text-slate-500">
            {user?.email}
          </p>

        </div>

        {/* LIMIT CARD */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl mb-6">

          <p className="text-sm text-slate-400 mb-2">
            API Usage
          </p>

          <div className="w-full h-3 bg-slate-800 rounded">
            <div
              className="h-3 bg-cyan-500"
              style={{ width: `${(calls / LIMIT) * 100}%` }}
            />
          </div>

          <p className="text-xs mt-2 text-slate-400">
            {calls} / {LIMIT} requests used
          </p>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">💰 Revenue</p>
            <h2 className="text-2xl font-bold">
              ${revenue.toFixed(2)}
            </h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">📊 API Calls</p>
            <h2 className="text-2xl font-bold">
              {calls}
            </h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p className="text-sm text-slate-400">⚡ Status</p>
            <h2 className="text-2xl font-bold text-green-400">
              Active
            </h2>
          </div>

        </div>

        {/* EMPTY STATE */}
        {calls === 0 && (
          <div className="bg-[#0A0A0A] p-6 rounded mb-6 text-sm text-slate-400">

            No usage yet.

            <br /><br />

            👉 Trigger your first API call to start generating revenue

          </div>
        )}

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded">

          <h3 className="mb-4">Recent API Revenue</h3>

          {events.map((e, i) => (
            <div key={i} className="flex justify-between border-b border-white/10 py-2 text-sm">
              <span>{e.endpoint}</span>
              <span className="text-cyan-400">
                ${Number(e.price).toFixed(3)}
              </span>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-10 text-center">

          <button className="bg-cyan-500 px-6 py-3 rounded text-black font-bold">
            Upgrade Plan
          </button>

        </div>

      </div>

    </div>
  );
}

{/* API KEY */}
<div className="bg-[#0A0A0A] p-6 rounded mt-10">

  <h3 className="mb-4">Your API Key</h3>

  <button
    onClick={async () => {
      const res = await fetch("/api/create-key", { method: "POST" });
      const data = await res.json();
      alert("API KEY: " + data.apiKey);
    }}
    className="bg-cyan-500 px-4 py-2 rounded text-black"
  >
    Generate API Key
  </button>

</div>

