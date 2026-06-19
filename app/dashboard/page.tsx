'use client';

import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function checkUser() {

      const { data } = await sb.auth.getUser();

      // ✅ USER YOK → LOGIN
      if (!data.user) {
        location.href = "/auth/login";
        return;
      }

      setLoading(false);
    }

    checkUser();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="text-center">

        <h1 className="text-2xl mb-6">
          ✅ Dashboard Loaded
        </h1>

        <button
          onClick={async () => {
            await sb.auth.signOut();
            location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Sign Out
        </button>

      </div>

    </div>
  );
}
