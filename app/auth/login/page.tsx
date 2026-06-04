'use client';

import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">

        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-white/60 mb-6">Access OVWI dashboard</p>

        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
}
