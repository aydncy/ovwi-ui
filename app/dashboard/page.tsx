'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(12);
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
    const res = await fetch('/api/verify', { method: 'POST' });
    const data = await res.json();

    setUsage(data.usage);
    setLimit(data.limit);
  };

  const percent = Math.min((usage / limit) * 100, 100);

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

        <button onClick={() => window.location.href = CHECKOUTS.pro} className="verify-btn">
          Buy Pro
        </button>

        <button onClick={() => window.location.href = CHECKOUTS.enterprise} className="verify-btn">
          Buy Enterprise
        </button>
      </div>

    </div>
  );
}
