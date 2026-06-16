'use client';

import { supabase } from '@/lib/supabase-browser';

export default function Login() {

  async function loginWithGoogle() {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  return (
    <div className="max-w-md mx-auto mt-20">

      <div className="card space-y-4">

        <h1 className="text-xl font-bold">Login</h1>

        <button
          onClick={loginWithGoogle}
          className="bg-red-500 w-full py-2 rounded"
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
}
