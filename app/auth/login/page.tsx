'use client';

import { useAuth } from '@/components/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Login() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading]);

  async function loginWithGoogle() {
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  }

  if (loading) return null;

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <button
          onClick={loginWithGoogle}
          className="bg-red-500 w-full py-3 rounded"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}
