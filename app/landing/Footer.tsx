import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-black text-white">
            O
          </span>
          <span className="font-bold tracking-tight text-foreground">OVWI</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <Link href="/docs" className="transition hover:text-foreground">Docs</Link>
          <Link href="/dashboard" className="transition hover:text-foreground">Dashboard</Link>
          <Link href="/auth/login" className="transition hover:text-foreground">Login</Link>
          <Link href="/auth/signup" className="transition hover:text-foreground">Sign up</Link>
        </nav>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} OVWI · Open Verifiable Workflow Infrastructure
        </p>
      </div>
    </footer>
  );
}
