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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* ✅ CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">

          <h1 className="text-2xl font-semibold mb-6">
            Dashboard
          </h1>

          {/* ✅ Conversion UI */}
          <UpgradeUI
            usage={license.monthly_usage}
            limit={license.monthly_limit}
            plan={license.plan}
          />

          {/* ✅ API KEY */}
          <div className="mb-6 bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="text-sm text-white/60 mb-1">API Key</div>
            <div className="text-sm break-all">
              {license.api_key}
            </div>
          </div>

          {/* ✅ BUTTON */}
          <button
            onClick={simulateCall}
            className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition"
          >
            Simulate API Call
          </button>

        </div>
      </div>
    </div>
  );
}
