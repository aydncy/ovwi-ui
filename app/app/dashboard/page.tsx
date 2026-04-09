'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  const CHECKOUT_PRO = process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO!;

  useEffect(() => {
    const key = localStorage.getItem('ovwi_api_key');

    if (!key) return;

    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key })
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      {data && (
        <>
          <div>Plan: {data.plan}</div>
          <div>Usage: {data.usage}</div>
          <div>Remaining: {data.remaining}</div>

          {!data.ok && data.upgrade && (
            <a href={CHECKOUT_PRO}>
              <button>Upgrade Plan →</button>
            </a>
          )}
        </>
      )}
    </div>
  );
}
