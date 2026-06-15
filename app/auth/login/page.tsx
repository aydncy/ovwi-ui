'use client';

import { supabase } from '@/lib/supabase-browser';

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://ovwi.cyzora.com/dashboard'
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl mb-4">Welcome Back</h1>

      <button
        onClick={login}
        className="bg-blue-500 px-6 py-3 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
