'use client';

import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function LoginPage() {
  const login = async () => {
    if (!supabase) {
      console.error('Supabase not configured');
      return;
    }

    await supabase!.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div>
      <button onClick={login}>
        Login with Google
      </button>
    </div>
  );
}
