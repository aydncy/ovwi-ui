'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const userRaw = localStorage.getItem('ovwi_user');
      if (!userRaw) return;

      const user = JSON.parse(userRaw);

      const res = await fetch(/api/dashboard?email=${user.email});
      const d = await res.json();

      const apiKey = localStorage.getItem('ovwi_api_key');

      setData({ ...d, apiKey });
    };

    run();
  }, []);

  if (!data) return null;

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>Plan: {data.plan}</p>
      <p>Usage: {data.usage}</p>
      <p>Limit: {data.limit}</p>

      <input value={data.apiKey || ''} readOnly style={{ width: 400 }} />
    </div>
  );
}
