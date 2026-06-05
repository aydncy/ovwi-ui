'use client';

import { supabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  const login = async () => {
    await supabase!.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>Welcome Back</h1>
        <p>
          Continue with Google to access your dashboard, API keys, analytics and infrastructure tools.
        </p>

        <button onClick={login} className="verify-btn">
          Continue with Google
        </button>

      </div>
    </div>
  );
}
