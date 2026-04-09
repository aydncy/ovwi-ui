'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const send = async () => {
    const supabase = createBrowserSupabase();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) setMsg(error.message);
    else setMsg('Magic link sent');
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="brand" style={{ marginBottom: 18 }}>OVWI</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-copy">Sign in with magic link</p>

        <input
          className="input"
          placeholder="you@company.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={send}>
          Send Magic Link
        </button>

        <div style={{ marginTop: 18, color: '#bdd0ea', fontSize: 14 }}>
          No account yet? <a href="/auth/signup" style={{ color: '#7fc8ff' }}>Create one</a>
        </div>

        <p style={{ marginTop: 10, fontSize: 12 }}>{msg}</p>
      </div>
    </div>
  );
}
