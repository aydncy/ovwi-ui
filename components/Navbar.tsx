"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/30">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        <Link href="/">
          <div className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            OVWI
          </div>
        </Link>

        <div className="flex items-center gap-4">

          <Link href="/pricing">
            <button className="px-5 h-11 rounded-xl bg-white/10 hover:bg-white/20 transition text-white">
              Pricing
            </button>
          </Link>

          {loggedIn ? (
            <Link href="/dashboard">
              <button className="px-5 h-11 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link href="/auth/login">
              <button className="px-5 h-11 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold">
                Login
              </button>
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}
