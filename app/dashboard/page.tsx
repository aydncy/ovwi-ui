"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sb } from "@/lib/supabase";
import UpgradeUI from "./UpgradeUI";

export default function Dashboard() {
  const router = useRouter();
  const [license, setLicense] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await sb.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      const { data } = await sb
        .from("users_licenses")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      setLicense(data);
      setLoading(false);
    };

    load();
  }, []);

  const simulateCall = async () => {
    if (!license) return;
    if (license.monthly_usage >= license.monthly_limit) return;

    await sb.from("api_calls").insert({
      user_id: license.user_id,
      endpoint: "simulate",
      status: 200,
    });

    await sb
      .from("users_licenses")
      .update({
        monthly_usage: license.monthly_usage + 1,
      })
      .eq("user_id", license.user_id);

    setLicense({
      ...license,
      monthly_usage: license.monthly_usage + 1,
    });
  };

  if (loading || !license) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const revenue = (license.monthly_usage * 0.03).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ✅ HERO VALUE */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-white/10 p-6 rounded-2xl">
          <h1 className="text-2xl font-semibold mb-2">
            Your API Business 💸
          </h1>
          <p className="text-white/60 text-sm mb-4">
            You are monetizing API usage. Each call = €0.03 revenue.
          </p>

          <div className="text-3xl font-bold text-cyan-400">
            €{revenue}
          </div>

          <p className="text-xs text-white/40 mt-1">
            Estimated revenue this month
          </p>
        </div>

        {/* ✅ CONVERSION UI */}
        <UpgradeUI
          usage={license.monthly_usage}
          limit={license.monthly_limit}
          plan={license.plan}
        />

        {/* ✅ API KEY */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="text-sm text-white/60 mb-1">
            Your API Key (use this in your app)
          </div>
          <div className="text-sm break-all">
            {license.api_key}
          </div>
        </div>

        {/* ✅ QUICK START */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
          <div className="text-sm text-white/60 mb-2">
            Quick Start Example
          </div>

          <pre className="text-xs text-white/70 bg-black p-3 rounded-lg overflow-x-auto">
{`fetch("https://api.ovwi.com/your-endpoint", {
  headers: {
    Authorization: "Bearer ${license.api_key}"
  }
}).then(res => res.json())`}
          </pre>
        </div>

        {/* ✅ ACTION */}
        <button
          onClick={simulateCall}
          className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition"
        >
          Simulate API Call
        </button>

      </div>
    </div>
  );
}
