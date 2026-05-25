import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <div className="font-bold text-white">
          OVWI
        </div>

        <nav className="flex gap-6 text-sm text-zinc-400">
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <Link
          href="/auth/login"
          className="rounded-xl bg-white px-4 py-2 text-sm text-black"
        >
          Get Started
        </Link>

      </div>
    </header>
  );
}
