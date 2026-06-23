"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // ✅ DASHBOARD'TA NAVBAR GÖSTERME
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="text-cyan-400 font-semibold text-lg">
        OVWI
      </div>

      <div className="flex items-center gap-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/docs">Docs</Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
