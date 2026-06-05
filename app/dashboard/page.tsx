'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    supabase!.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setEmail(data.user.email || '');
    });
  }, []);

  const runVerify = async () => {
  try {
    const session = await supabase!.auth.getSession();

    const token = session.data.session?.access_token;

    if (!token) {
      window.location.href = '/auth/login';
      return;
    }

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    const data = await res.json();

    if (data.upgrade) {
      window.location.href = '/upgrade';
      return;
    }

    setUsage(Number(data.usage) || 0);
    setLimit(Number(data.limit) || 50);

  } catch (e) {
    console.error('verify error', e);
  }
};

  const percent = limit ? (usage / limit) * 100 : 0;

  return (
    <div className="dashboard">

      <div className="dashboard-top">
        <h1>Dashboard</h1>
        <span>{email}</span>
      </div>

      <div className="stats">
        <div className="stat">
          <span>Requests</span>
          <strong>{usage}</strong>
        </div>

        <div className="stat">
          <span>Remaining</span>
          <strong>{limit - usage}</strong>
        </div>

        <div className="stat">
          <span>Plan</span>
          <strong>Free</strong>
        </div>
      </div>

      <div className="panel">
        <button onClick={runVerify} className="verify-btn">
          Run Verification
        </button>

        <div className="progress">
          <div style={{ width: percent + '%' }} />
        </div>
      </div>

      <div className="panel">
        <h3>Usage</h3>
        <p>{usage} / {limit} requests used</p>
      </div>

      <div className="panel">
        <h3>Upgrade</h3>
        <button className="verify-btn">Buy Pro</button>
        <button className="verify-btn">Buy Enterprise</button>
      </div>

    </div>
  );
}
