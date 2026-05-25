'use client';

import Navbar from '@/components/Navbar';
import { getSupabase } from '@/lib/supabase-browser';

export default function Login() {
  const supabase = getSupabase();

  const login = async () => {
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
      <div className="auth-page">
        <div className="auth-box">
          <h1>OVWI Login</h1>

          <button onClick={login} className="verify-btn">
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
}
