'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <div className="fixed top-0 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl z-50">
      <div className="max-w-6xl mx-auto flex justify-between p-4">
        <b>OVWI</b>

        <div className="flex gap-4 text-sm text-gray-300">
          <a href="/docs">Docs</a>
          <a href="/pricing">Pricing</a>
          {session ? (
            <a href="/dashboard">Dashboard</a>
          ) : (
            <a href="/auth/login">Login</a>
          )}
        </div>
      </div>
    </div>
  );
}
