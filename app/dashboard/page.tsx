'use client';

import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [plan, setPlan] = useState("free");
  const [ready, setReady] = useState(false);

  function getLimit(p: string) {
    if (p === "pro") return 2000;
    if (p === "scale") return 10000;
    return 50;
  }

  async function init(userId: string) {

    const { data: existing } = await sb
      .from("api_keys")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!existing) {
      const key = "sk_live_" + Math.random().toString(36).slice(2, 12);

      await sb.from("api_keys").insert({
        user_id: userId,
        api_key: key
      });
    }
  }

  async function load() {

    const { data } = await sb.auth.getUser();

    if (!data.user) {
      location.href = "/auth/login";
      return;
    }

    setUser(data.user);

    await init(data.user.id);

    const { data: profile } = await sb
      .from("profiles")
      .select("plan")
      .eq("id", data.user.id)
      .single();

    setPlan(profile?.plan || "free");

    const { data: ev } = await sb
      .from("api_events")
      .select("*")
      .eq("user_id", data.user.id);

    setEvents(ev || []);
    setReady(true);
  }

  useEffect(() => {
    load();
  }, []);

  if (!ready) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const calls = events.length;
  const revenue = events.reduce((s, e) => s + Number(e.price), 0);
  const limit = getLimit(plan);

  async function runCall() {

    const { data: key } = await sb
      .from("api_keys")
      .select("api_key")
      .limit(1)
      .single();

    const res = await fetch("/api/use-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey: key?.api_key })
    });

    const data = await res.json();

    if (data.error === "limit reached") {
      alert("🚫 Limit reached → Upgrade plan");
      return;
    }

    load();
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-4xl px-6 py-12 text-center">

        <h1 className="text-2xl font-bold mb-6">
          Your API Business
        </h1>

        {/* ACTION */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl mb-6">

          <button
            onClick={runCall}
            className="bg-cyan-500 px-6 py-3 rounded text-black font-bold"
          >
            🚀 Run API Call
          </button>

        </div>

        {/* USAGE */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl mb-6">

          <p className="mb-2 text-sm text-slate-400">
            {calls} / {limit} requests used
          </p>

          <div className="w-full bg-slate-800 h-3 rounded">
            <div
              className="bg-cyan-500 h-3"
              style={{ width: `${(calls / limit) * 100}%` }}
            />
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          <div className="bg-[#0A0A0A] p-6 rounded-xl">
            💰 Revenue: ${revenue.toFixed(2)}
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded-xl">
            📊 Plan: {plan}
          </div>

        </div>

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl mb-6 text-left">

          <h3 className="mb-4 font-bold">
            API Calls
          </h3>

          {events.length === 0 && (
            <p className="text-sm text-slate-500">
              No calls yet
            </p>
          )}

          {events.map((e, i) => (
            <div key={i} className="flex justify-between text-sm border-b border-white/5 py-2">
              <span>{e.endpoint}</span>
              <span>${Number(e.price).toFixed(3)}</span>
            </div>
          ))}

        </div>

        {/* LIMIT BLOCK */}
        {calls >= limit && (
          <div className="bg-red-500/20 p-6 rounded-xl mb-6">

            <h2 className="text-red-400 font-bold">
              🚫 Limit Reached
            </h2>

            <p className="text-sm mb-4">
              Upgrade to continue
            </p>

          </div>
        )}

        {/* UPGRADE */}
        <div className="flex justify-center gap-4">

          <a href="https://aydncy.gumroad.com/l/ovwi_pro"
             className="bg-cyan-500 px-4 py-2 rounded text-black">
            🚀 Pro (€9)
          </a>

          <a href="https://aydncy.gumroad.com/l/ovwi_scale"
             className="bg-purple-500 px-4 py-2 rounded text-white">
            💎 Scale (€29)
          </a>

        </div>

      </div>

    </div>
  );
}
