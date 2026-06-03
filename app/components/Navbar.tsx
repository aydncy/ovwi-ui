'use client';
import { useEffect, useState } from 'react';
import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await supabase!.auth.getSession();
        setLoggedIn(!!data.session);
        
        const { data: { subscription } } = supabase!.auth.onAuthStateChange((_e: string, session: any) => {
          setLoggedIn(!!session);
        });
        return () => subscription?.unsubscribe();
      } catch (e) {
        console.error("Auth init error", e);
      }
    };
    initAuth();
  }, []);

  const logout = async () => {
    await supabase!.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <div className="nav-inner">
        <a href="/" className="brand">OVWI</a>
        <div className="nav-links">
          <a href="/docs"><button className="nav-btn">Docs</button></a>
          {loggedIn ? (
            <>
              <a href="/dashboard"><button className="nav-btn">Dashboard</button></a>
              <button onClick={logout} className="nav-btn primary-btn">Logout</button>
            </>
          ) : (
            <a href="/auth/login"><button className="nav-btn primary-btn">Login</button></a>
          )}
        </div>
      </div>
    </div>
  );
}
