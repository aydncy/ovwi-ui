'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { generateEvent } from "@/lib/fakeEngine";

export default function Dashboard() {

  const [events, setEvents] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [calls, setCalls] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const e = generateEvent();

      setEvents(prev => [e, ...prev.slice(0, 5)]);
      setRevenue(r => r + e.price);
      setCalls(c => c + 1);

    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Your API Business
        </h1>

        {/* METRICS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-[#0A0A0A] p-6 rounded-xl">
            <p>💰 Revenue</p>
            <h2 className="text-2xl font-bold">
              ${revenue.toFixed(2)}
            </h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded-xl">
            <p>📊 API Calls</p>
            <h2>{calls}</h2>
          </div>

          <div className="bg-[#0A0A0A] p-6 rounded-xl">
            <p>💸 Avg / Call</p>
            <h2>
              {calls === 0 ? 0 : (revenue / calls).toFixed(3)}
            </h2>
          </div>

        </div>

        {/* EVENTS */}
        <div className="bg-[#0A0A0A] p-6 rounded-xl">

          <h3 className="mb-4">💸 Live Revenue Stream</h3>

          <div className="space-y-2">

            {events.map((e, i) => (
              <div key={i} className="flex justify-between">

                <span>{e.type}</span>
                <span>${e.price.toFixed(3)}</span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
