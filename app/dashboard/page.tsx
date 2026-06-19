'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { sb } from "@/lib/supabase";

export default function Dashboard() {

  const [events, setEvents] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [calls, setCalls] = useState(0);

  async function load() {
    const { data } = await sb
      .from("api_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!data) return;

    setEvents(data);

    setRevenue(
      data.reduce((sum, e) => sum + Number(e.price), 0)
    );

    setCalls(data.length);
  }

  useEffect(() => {
    load();

    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-2xl font-bold mb-6">
          Your API Business
        </h1>

        {/* METRICS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p>💰 Revenue</p>
            <h2>${revenue.toFixed(2)}</h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p>📊 Calls</p>
            <h2>{calls}</h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded">
            <p>💸 Avg</p>
            <h2>
              {calls === 0 ? 0 : (revenue / calls).toFixed(3)}
            </h2>
          </div>

        </div>

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded">

          <h3 className="mb-4">💸 Real Events</h3>

          {events.map((e, i) => (
            <div key={i} className="flex justify-between mb-2">
              <span>{e.endpoint}</span>
              <span>${e.price}</span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
