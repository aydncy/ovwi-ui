'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) setSession(session);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="navbar">
      <div className="nav-inner">
        <a href="/" className="brand">OVWI ENGINE</a>

        <div className="nav-links">
          <a href="/docs"><button className="nav-btn">Docs</button></a>

          {session ? (
            <a href="/dashboard">
              <button className="nav-btn primary-btn">Dashboard</button>
            </a>
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
