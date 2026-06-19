'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {

  const [usage] = useState(12543);

  const cards = [
    { title: "💰 Revenue Today", value: "$124.50", sub: "+8%" },
    { title: "💰 Monthly Revenue", value: "$2,847", sub: "+12%" },
    { title: "📊 API Calls", value: usage, sub: "+10%" },
    { title: "👤 Paying Users", value: "89", sub: "+5" }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-2xl font-bold">
              Your API Business
            </h1>
            <p className="text-xs text-slate-500">
              api-key: sk_live_92kx****
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm border border-white/20 rounded">
              Dashboard
            </button>

            <button className="px-4 py-2 bg-cyan-500 rounded text-black font-bold">
              🚀 Upgrade
            </button>
          </div>

        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {cards.map((c, i) => (
            <div key={i} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl">
              <p className="text-sm text-slate-400">{c.title}</p>
              <h3 className="text-2xl font-bold mt-2">{c.value}</h3>
              <p className="text-xs text-green-400 mt-1">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* REVENUE GRAPH */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl mb-10">
          <h3 className="text-lg font-bold mb-4">
            Revenue This Month
          </h3>

          <div className="flex items-end gap-2 h-40">
            {[40,60,30,70,50,80,60,75,35,65,55,85].map((h,i)=>(
              <div key={i} style={{height: h+"%"}} className="flex-1 bg-cyan-500/50 rounded"></div>
            ))}
          </div>
        </div>

        {/* API REVENUE LOGS */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-xl">

          <h3 className="text-lg font-bold mb-4">
            💸 Recent Revenue Events
          </h3>

          <div className="space-y-3">

            {[
              { type: "GPT-4 request", price: "$0.03" },
              { type: "Image generation", price: "$0.40" },
              { type: "Chat completion", price: "$0.01" },
              { type: "Embedding", price: "$0.002" }
            ].map((item, i) => (

              <div key={i} className="flex justify-between bg-white/5 p-3 rounded border border-white/10">
                <span className="text-sm text-slate-300">{item.type}</span>
                <span className="text-sm text-cyan-400 font-bold">{item.price}</span>
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
