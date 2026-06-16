'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {

  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [apiKey, setApiKey] = useState('');

  const limit = 50;

  async function fetchUsage() {
    const res = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    setUsage(data.usage);
    setApiKey(data.apiKey);
  }

  useEffect(() => {
    if (email) {
      fetchUsage();
    }
  }, [email]);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Usage: {usage} / {limit}</p>
      <p>API Key: {apiKey}</p>

      <button onClick={fetchUsage}>
        Refresh
      </button>
    </div>
  );
}
