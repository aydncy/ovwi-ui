'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setLoggedIn(!!session);
      });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="nav-inner">

        <Link href="/" className="brand">
          OVWI
        </Link>

        <div className="nav-links">

          <Link href="/docs">
            <button className="nav-btn">Docs</button>
          </Link>

          {loggedIn ? (
            <>
              <Link href="/dashboard">
                <button className="nav-btn">Dashboard</button>
              </Link>

              <button onClick={logout} className="nav-btn primary-btn">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login">
              <button className="nav-btn primary-btn">Login</button>
            </Link>
          )}

        </div>

      </div>
    </div>
  );
}
