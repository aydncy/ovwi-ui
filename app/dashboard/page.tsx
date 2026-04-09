'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const run = async () => {
      const userRaw = localStorage.getItem('ovwi_user');

      const user = JSON.parse(userRaw);

      const res = await fetch(\/api/dashboard?email=${user.email}\);
      const d = await res.json();

      const apiKey = localStorage.getItem('ovwi_api_key');

      setData({ ...d, apiKey });
    };

    run();
  }, []);


  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Plan: {data.plan}</p>
      <p>Usage: {data.usage}</p>
      <p>Limit: {data.limit}</p>
      <input value={data.apiKey || ''} readOnly />
    </div>
  );
}
//force-build-1775737823
