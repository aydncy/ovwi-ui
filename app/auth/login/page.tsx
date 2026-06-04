'use client';

import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 w-full max-w-md">
        <h1 className="text-3xl mb-4">Login</h1>

        <button
          onClick={login}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
        >
          Continue with Google
        </button>
      </div>

    </div>
  );
}
