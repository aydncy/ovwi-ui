'use client';

import { supabase } from '@/lib/supabase-browser';

export default function Login() {

  const login = async () => {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://ovwi.cyzora.com/dashboard'
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">

      <h1 className="text-3xl font-bold mb-4">
        Welcome Back
      </h1>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        Continue with Google to access your dashboard, API keys and usage analytics.
      </p>

      <button
        onClick={login}
        className="bg-white text-black px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
      >
        <img src="/google.svg" className="w-5 h-5" />
        Continue with Google
      </button>

    </div>
  );
}
