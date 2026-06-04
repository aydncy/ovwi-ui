'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e: any, session: any) => {
      setLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <div className="nav-inner">

        <div className="brand">OVWI</div>

        <div className="nav-links">
          <a href="/docs" className="nav-btn">Docs</a>

          {loggedIn ? (
            <>
              <a href="/dashboard" className="nav-btn primary-btn">Dashboard</a>
              <button onClick={logout} className="nav-btn">Logout</button>
            </>
          ) : (
            <a href="/auth/login" className="nav-btn primary-btn">Login</a>
          )}
        </div>

      </div>
    </div>
  );
}
