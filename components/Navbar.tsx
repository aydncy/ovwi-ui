'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_e, session) => setLoggedIn(!!session)
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="navbar">
      <div className="nav-inner">
        <a href="/">OVWI</a>

        <div className="nav-links">
          <a href="/docs">Docs</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      </div>
    </div>
  );
}
