'use client';

import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(true);

  function getLimit(p: string) {
    if (p === "pro") return 2000;
    if (p === "scale") return 10000;
    return 50;
  }

  async function load() {
    const { data } = await sb.auth.getUser();

    if (!data.user) {
      location.href = "/auth/login";
      return;
    }

    setUser(data.user);

    const { data: profile } = await sb
      .from("profiles")
      .select("plan")
      .eq("id", data.user.id)
      .single();

    const p = profile?.plan || "free";
    setPlan(p);

    const { data: ev } = await sb
      .from("api_events")
      .select("*")
      .eq("user_id", data.user.id);

    setEvents(ev || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="text-white p-10">Loading...</div>;

  const calls = events.length;
  const revenue = events.reduce((s, e) => s + Number(e.price), 0);
  const limit = getLimit(plan);

  async function runCall() {

    const { data: key } = await sb
      .from("api_keys")
      .select("api_key")
      .limit(1)
      .single();

    if (!key) {
      alert("⚠️ Generate API key first");
      return;
    }

    const res = await fetch("/api/use-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ apiKey: key.api_key })
    });

    const data = await res.json();

    if (data.error === "limit reached") {
      alert("🚫 Limit reached → Upgrade required");
      return;
    }

    if (data.error) {
      alert(data.error);
      return;
    }

    load();
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">

      <div className="w-full max-w-4xl px-6 py-12">

        <h1 className="text-xl mb-6 text-center">
          Your API Business
        </h1>

        {/* RUN */}
        <div className="bg-[#0A0A0A] p-6 rounded text-center mb-6">
          <button
            onClick={runCall}
            className="bg-cyan-500 px-6 py-3 rounded text-black font-bold"
          >
            Run API Call
          </button>
        </div>

        {/* USAGE */}
        <div className="bg-[#0A0A0A] p-6 rounded mb-6">
          <p>{calls} / {limit}</p>
          <div className="w-full bg-slate-800 h-3 rounded">
            <div
              className="bg-cyan-500 h-3"
              style={{ width: `${(calls / limit) * 100}%` }}
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-[#0A0A0A] p-6 rounded">
            Revenue: ${revenue.toFixed(2)}
          </div>
          <div className="bg-[#0A0A0A] p-6 rounded">
            Plan: {plan}
          </div>
        </div>

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded mb-6">
          {events.map((e, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{e.endpoint}</span>
              <span>${Number(e.price).toFixed(3)}</span>
            </div>
          ))}
        </div>

        {/* UPGRADE LINKS ✅ FIXED */}
        <div className="text-center">

          <a
            href="https://aydncy.gumroad.com/l/ovwi_pro"
            target="_blank"
            className="bg-cyan-500 px-4 py-2 rounded text-black mr-4"
          >
            🚀 Pro (€9)
          </a>

          <a
            href="https://aydncy.gumroad.com/l/ovwi_scale"
            target="_blank"
            className="bg-purple-500 px-4 py-2 rounded text-white"
          >
            💎 Scale (€29)
          </a>

        </div>

      </div>
    </div>
  );
}
