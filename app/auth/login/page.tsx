'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Login() {

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();

      // ✅ user varsa direkt dashboard
      if (data.user) {
        window.location.href = '/dashboard';
      }
    };

    check();
  }, []);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  return (
    <div className="p-10 text-white">
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
