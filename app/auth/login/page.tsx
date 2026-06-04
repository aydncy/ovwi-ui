'use client';

import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">

        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-white/60 mb-6">Continue to your dashboard</p>

        <button
          onClick={login}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
}
