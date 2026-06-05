'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    supabase!.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/auth/login';
        return;
      }
      setEmail(data.user.email || '');
    });
  }, []);

  const generateKey = async () => {
    const session = await supabase!.auth.getSession();

    const res = await fetch('/api/create-key', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.data.session!.access_token
      }
    });

    const data = await res.json();
    setApiKey(data.key);
  };

  const runVerify = async () => {
  if (usage >= limit) {
    window.location.href = '/upgrade';
    return;
  }

    const session = await supabase!.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) return;

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

    setUsage(data.usage);
    setLimit(data.limit);
  };

  const percent = limit ? (usage / limit) * 100 : 0;

  return (
    <div className="dashboard">

      <div className="dashboard-top">
        <h1>Dashboard</h1>
        <span>{email}</span>
      </div>

      {usage >= limit && (
  <div style={{background:'#ff2d55',padding:'12px',borderRadius:'10px',marginBottom:'20px'}}>
    Limit reached. Upgrade to continue.
  </div>
)}
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
        <h3>API Key</h3>

        <button onClick={generateKey} className="verify-btn">
          Generate Key
        </button>

        {apiKey && (
          <div style={{ marginTop: 10 }}>
            <code>{apiKey}</code>
          </div>
        )}
      </div>

    </div>
  );
}
