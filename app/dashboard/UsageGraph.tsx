"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function UsageGraph({ userId }: { userId: string }) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await sb
        .from("usage_logs")
        .select("created_at")
        .eq("user_id", userId);

      const counts: Record<string, number> = {};

      data?.forEach((d) => {
        const day = new Date(d.created_at).getDate().toString();
        counts[day] = (counts[day] || 0) + 1;
      });

      setData(Object.values(counts));
    };

    load();
  }, [userId]);

  return (
    <div className="bg-white/5 p-4 rounded-xl">
      <div className="text-sm text-white/60 mb-2">
        API Usage (Real Data)
      </div>

      <div className="flex gap-1 items-end h-24">
        {data.map((v, i) => (
          <div
            key={i}
            className="bg-cyan-400 w-full"
            style={{ height: v * 5 }}
          />
        ))}
      </div>
    </div>
  );
}
