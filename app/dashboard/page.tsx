'use client';

import { useEffect, useState } from 'react';
import { requireUser } from '@/lib/auth-guard';
import { clearSession } from '@/lib/session';
import { getCheckoutLink } from '@/lib/checkout';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const user = requireUser();
    if (!user) return;

    const load = async () => {
      let apiKey = localStorage.getItem('ovwi_api_key');

      if (!apiKey) {
        const res = await fetch('/api/create-key', { method: 'POST' });
        const d = await res.json();
        apiKey = d.apiKey;
        localStorage.setItem('ovwi_api_key', apiKey);
      }

      const dash = await fetch(/api/dashboard?email=${user.email});
      const d = await dash.json();

      setData({ ...d, apiKey });
    };

    load();
  }, []);

  if (!data) return null;

  const upgrade = getCheckoutLink('pro', data.apiKey);

  return (
    <div style={{ padding: 40, color: 'white' }}>
      <h1>Dashboard</h1>

      <p>Plan: {data.plan}</p>
      <p>Usage: {data.usage}</p>
      <p>Limit: {data.limit}</p>

      <input value={data.apiKey} readOnly style={{ width: 400 }} />

      <br /><br />

      <button onClick={() => navigator.clipboard.writeText(data.apiKey)}>
        Copy Key
      </button>

      <button onClick={() => window.location.href = upgrade}>
        Upgrade
      </button>

      <button onClick={() => {
        clearSession();
        localStorage.clear();
        window.location.href = '/';
      }}>
        Logout
      </button>
    </div>
  );
}
