'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: 18,
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <b>OVWI</b>

      <div style={{ display: 'flex', gap: 12 }}>
        <a href="/docs">Docs</a>

        {session ? (
          <a href="/dashboard">Dashboard</a>
        ) : (
          <a href="/auth/login">Login</a>
        )}
      </div>
    </div>
  );
}