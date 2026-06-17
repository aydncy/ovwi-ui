'use client';

import Link from 'next/link';
import { useAuth } from '@/components/useAuth';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  return (
    <nav className="border-b border-white/10 bg-black">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LEFT */}
        <Link href="/" className="text-lg font-bold">
          OVWI
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-gray-300">

          <Link href="/">Home</Link>
          <Link href="/docs">Docs</Link>

          {user && <Link href="/dashboard">Dashboard</Link>}

          {user
            ? <button onClick={handleLogout}>Logout</button>
            : <Link href="/auth/login">Login</Link>
          }

        </div>

      </div>

    </nav>
  );
}
