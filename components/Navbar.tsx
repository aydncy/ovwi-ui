"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // dashboard'ta görünmesin
  if (pathname?.startsWith("/dashboard")) return null;

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
        </div>

        {/* RIGHT */}
        <div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
