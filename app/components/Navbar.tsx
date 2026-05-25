'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="nav-inner">
        <a href="/" className="brand">OVWI</a>

        <div className="nav-links">
          <a href="/docs">
            <button className="nav-btn">Docs</button>
          </a>

          {session ? (
            <>
              <a href="/dashboard">
                <button className="nav-btn">Dashboard</button>
              </a>

              <button onClick={logout} className="nav-btn primary-btn">
                Logout
              </button>
            </>
          ) : (
            <a href="/auth/login">
              <button className="nav-btn primary-btn">Login</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
