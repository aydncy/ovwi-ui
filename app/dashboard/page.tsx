'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getSupabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const supabase = getSupabase();
  const [email, setEmail] = useState('');

  useEffect(() => {
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
        <h1>Dashboard</h1>
        <p>{email}</p>
      </div>
    </>
  );
}
