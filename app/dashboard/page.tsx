"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sb } from "@/lib/supabase";
import UpgradeUI from "./UpgradeUI";
import UsageGraph from "./UsageGraph";
import Leaderboard from "./Leaderboard";

type License = {
  user_id: string;
  api_key: string;
  plan: string;
  monthly_limit: number;
  monthly_usage: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [license, setLicense] = useState<License | null>(null);
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

      if (data?.plan === "pro") {
        data.monthly_limit = 999999;
      }

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

    await sb.from("usage_logs").insert({
      user_id: license.user_id,
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

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-2xl">
          <h1 className="text-2xl font-semibold">Your API Business</h1>
          <div className="text-3xl text-cyan-400 mt-2">
            €{revenue}
          </div>
        </div>

        <UpgradeUI
          usage={license.monthly_usage}
          limit={license.monthly_limit}
          plan={license.plan}
        />

        <UsageGraph userId={license.user_id} />

        <Leaderboard me={license.user_id} />

        <button
          onClick={simulateCall}
          className="px-4 py-2 bg-cyan-500 rounded-lg"
        >
          Simulate API Call
        </button>

      </div>
    </div>
  );
}
