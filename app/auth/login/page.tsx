'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { useAuth } from '@/components/useAuth';

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
      provider: 'google',
    });
  }

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

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
