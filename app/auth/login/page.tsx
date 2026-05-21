'use client';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase-browser';

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass max-w-md w-full p-12 rounded-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-zinc-400 mb-10">Sign in to access your OVWI dashboard</p>
          <button onClick={login} className="primary-btn w-full py-4 rounded-2xl text-lg">
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}
