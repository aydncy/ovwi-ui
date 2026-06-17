'use client';

import { supabase } from '@/lib/supabase-browser';

export default function Login() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  return (
    <div className="flex justify-center mt-20">
      <button onClick={login} className="bg-red-500 px-6 py-3 rounded">
        Login with Google
      </button>
    </div>
  );
}
