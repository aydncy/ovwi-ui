'use client';

import { useEffect, useState } from 'react';
import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function Dashboard() {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase!.auth.getSession();

      if (!data.session) {
        window.location.href = '/auth/login';
        return;
      }
    };

    init();
  }, []);

  const verify = async () => {
    try {
      const res = await fetch('/api/verify', { method: 'POST' });
      const data = await res.json();

      console.log('verify result:', data);

      setRemaining(Number(data.remaining) || 0);
    } catch (e) {
      console.error('verify error', e);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Dashboard</h1>

      <p className="mb-4">Remaining: {remaining ?? 0}</p>

      <button
        onClick={verify}
        className="px-4 py-2 bg-black text-white rounded-xl"
      >
        Run Verify
      </button>
    </div>
  );
}
