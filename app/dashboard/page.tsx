'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const apiKey = localStorage.getItem('ovwi_api_key');
      const userRaw = localStorage.getItem('ovwi_user');

      if (!apiKey || !userRaw) {
        window.location.href = '/login';
        return;
      }

      const user = JSON.parse(userRaw);

      // ✅ CRITICAL FIX
      const res = await fetch(`/api/dashboard?email=${user.email}`);
      const d = await res.json();

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
      <input value={data.apiKey} readOnly />
    </div>
  );
}