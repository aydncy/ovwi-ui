"use client";

import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

type UserRow = {
  user_id: string;
  monthly_usage: number;
};

export default function Leaderboard({ me }: { me: string }) {
  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await sb
        .from("users_licenses")
        .select("user_id, monthly_usage")
        .order("monthly_usage", { ascending: false })
        .limit(5);

      setUsers(data || []);
    };

    load();
  }, []);

  return (
    <div className="bg-white/5 p-4 rounded-xl mt-6">
      <div className="text-sm text-white/60 mb-3">
        Top API Users 🔥
      </div>

      {users.map((u, i) => (
        <div
          key={u.user_id}
          className={`flex justify-between text-sm py-1 ${
            u.user_id === me ? "text-cyan-400" : ""
          }`}
        >
          <span>#{i + 1}</span>
          <span>{u.monthly_usage}</span>
        </div>
      ))}
    </div>
  );
}
