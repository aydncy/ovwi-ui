"use client";

import { useRouter } from "next/navigation";
import { sb } from "@/lib/supabase";

export default function DashboardHeader() {
  const router = useRouter();

  const handleSignOut = async () => {
    await sb.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="text-xl font-semibold text-cyan-400">
        OVWI Dashboard
      </div>

      <button
        onClick={handleSignOut}
        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
