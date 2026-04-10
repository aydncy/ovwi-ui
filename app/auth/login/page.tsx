'use client';

import { useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const supabase = createBrowserSupabase();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        setState('error');
        setMessage(error.message);
        return;
      }

      setState('success');
      setMessage('Magic link sent. Check your email.');
    } catch (e: any) {
      setState('error');
      setMessage(e.message || 'Request failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="card auth-card">
        <div className="brand" style={{ marginBottom: 18 }}>OVWI</div>
        <h1 className="auth-title">Login</h1>
        <p className="auth-copy">Enter your email and we will send you a magic link.</p>

        <div className="field">
          <label className="label">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSubmit}>Send Magic Link</button>

        {state === 'success' && <div className="auth-note auth-success">{message}</div>}
        {state === 'error' && <div className="auth-note auth-error">{message}</div>}

        <div style={{ marginTop: 18, color: '#bdd0ea', fontSize: 14 }}>
          No account yet? <a href="/auth/signup" style={{ color: '#7fc8ff' }}>Create one</a>
        </div>
      </div>
    </div>
  );
}
