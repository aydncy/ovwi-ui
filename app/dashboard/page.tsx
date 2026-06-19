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

    // PLAN
    const { data: profile } = await sb
      .from("profiles")
      .select("plan")
      .eq("id", data.user.id)
      .single();

    const p = profile?.plan || "free";
    setPlan(p);

    // EVENTS
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

    // API KEY
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
      alert(
        "🚫 LIMIT REACHED\n\nFREE: 50\nPRO: 2000 (€9)\nSCALE: 10000 (€29)\n\n👉 Upgrade now"
      );
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

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Your API Business</h1>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>

        {/* FIRST ACTION */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl mb-6 text-center">
          <h2 className="text-lg font-bold mb-2">
            🚀 Run your first API call
          </h2>

          <button
            onClick={runCall}
            className="bg-cyan-500 px-6 py-3 rounded text-black font-bold hover:bg-cyan-400"
          >
            Run API Call
          </button>
        </div>

        {/* USAGE BAR */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl mb-6">
          <p className="text-sm mb-2">
            {calls} / {limit} requests
          </p>

          <div className="w-full bg-slate-800 h-3 rounded">
            <div
              className="bg-cyan-500 h-3"
              style={{
                width: `${Math.min((calls / limit) * 100, 100)}%`
              }}
            />
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p>Revenue</p>
            <h2>${revenue.toFixed(2)}</h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p>Plan</p>
            <h2 className="capitalize">{plan}</h2>
          </div>

        </div>

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded">

          <h3 className="mb-4">API Usage</h3>

          {events.length === 0 && (
            <p className="text-slate-500 text-sm">
              No usage yet. Click above to start.
            </p>
          )}

          {events.map((e, i) => (
            <div key={i} className="flex justify-between text-sm border-b border-white/5 py-2">
              <span>{e.endpoint}</span>
              <span>${Number(e.price).toFixed(3)}</span>
            </div>
          ))}

        </div>

        {/* LIMIT POPUP STATE */}
        {calls >= limit && (
          <div className="mt-8 bg-red-500/10 border border-red-500/30 p-6 rounded text-center">

            <h2 className="text-red-400 font-bold mb-2">
              🚫 Limit Reached
            </h2>

            <p className="text-sm mb-4">
              Upgrade to continue using the API
            </p>

            <div className="flex justify-center gap-4">

              https://aydncy.gumroad.com/l/ovwi_pro
                🚀 Pro (€9)
              </a>

              https://aydncy.gumroad.com/l/ovwi_scale
                💎 Scale (€29)
              </a>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
