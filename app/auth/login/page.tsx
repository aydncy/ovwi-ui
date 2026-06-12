'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Login() {

  useEffect(() => {
    const check = async () => {

      // ✅ GUARD EKLEDİK
      if (!supabase) return;

      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        window.location.href = '/dashboard';
      }
    };

    check();
  }, []);

  const login = async () => {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  return (
    <div className="max-w-md mx-auto py-20 text-white">

      <h1 className="text-2xl mb-4">Welcome Back</h1>

      <p className="text-gray-400 mb-6">
        Continue with Google to access your dashboard, API keys, analytics and infrastructure tools.
      </p>

      <button
        onClick={login}
        className="bg-blue-500 px-6 py-3 rounded"
      >
        Continue with Google
      </button>

    </div>
  );
}
