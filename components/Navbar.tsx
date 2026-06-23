"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);

  // ✅ kullanıcıyı çek
  useEffect(() => {
    const getUser = async () => {
      const { data } = await sb.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();

    // ✅ login/logout listener
    const { data: listener } = sb.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ dashboard'ta navbar yok
  if (pathname?.startsWith("/dashboard")) return null;

  const handleLogout = async () => {
    await sb.auth.signOut();
    router.push("/");
  };

  return (
    <div className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT */}
        <div className="text-cyan-400 font-semibold text-lg">
          OVWI
        </div>

        {/* CENTER */}
        <div className="flex items-center gap-8 text-sm text-white/80">
          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>

          {user && <Link href="/dashboard">Dashboard</Link>}
        </div>

        {/* RIGHT */}
        <div>
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition"
            >
              Sign In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              Sign Out
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
