'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function Navbar() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    sb.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = sb.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await sb.auth.signOut();
    location.href = "/";
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">

      <Link href="/">
        <h1 className="text-cyan-400 font-bold">OVWI</h1>
      </Link>

      <div className="flex gap-6 items-center">

        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>

        {user && (
          <Link href="/dashboard">Dashboard</Link>
        )}

        {!user ? (
          <Link href="/auth/login">
            <button className="bg-cyan-500 px-4 py-2 rounded text-black">
              Sign In
            </button>
          </Link>
        ) : (
          <button onClick={signOut} className="bg-red-500 px-4 py-2 rounded">
            Sign Out
          </button>
        )}

      </div>

    </div>
  );
}
