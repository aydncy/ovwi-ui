'use client';

import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg border">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <button
          onClick={login}
          className="w-full px-4 py-2 bg-black text-white rounded-xl"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
