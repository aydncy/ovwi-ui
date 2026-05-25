'use client';

import Navbar from '@/components/Navbar';
import { getSupabase } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email || '');
    });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 100 }}>
        <h1>Dashboard</h1>
        <p>{email}</p>
      </div>
    </>
  );
}
