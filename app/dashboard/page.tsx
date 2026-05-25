'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getSupabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const supabase = getSupabase();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setEmail(data.user.email || '');
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-top">
          <h1>OVWI Engine</h1>
          <p style={{color:'#8da6cf'}}>{email}</p>
        </div>
      </div>
    </>
  );
}
