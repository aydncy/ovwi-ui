'use client';

import Navbar from '@/components/Navbar';
import { getSupabase } from '@/lib/supabase-browser';

export default function Login() {
  const login = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: 100 }}>
        <h1>Login</h1>
        <button onClick={login}>Google Login</button>
      </div>
    </>
  );
}
