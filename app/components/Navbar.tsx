'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase!.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });

    const { data: { subscription } } =
      supabase!.auth.onAuthStateChange((_e: any, session: any) => {
        setLoggedIn(!!session);
      });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase!.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <div className="nav-inner">

        {/* LOGO */}
        <Link href="/" className="brand">
          OVWI
        </Link>

        {/* LINKS */}
        <div className="nav-links">

          <Link href="/docs" className="nav-btn">
            Docs
          </Link>

          {loggedIn ? (
            <>
              <Link href="/dashboard" className="nav-btn">
                Dashboard
              </Link>

              <button onClick={logout} className="nav-btn">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="nav-btn">
              Login
            </Link>
          )}

        </div>

      </div>
    </div>
  );
}
