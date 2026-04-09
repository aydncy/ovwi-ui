'use client';

import { useState } from 'react';

export default function DocsPage() {
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const CHECKOUT_PRO = process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO!;

  const createKey = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-key', { method: 'POST' });
      const data = await res.json();
      if (data.ok && data.apiKey) {
        setApiKey(data.apiKey);
        localStorage.setItem('ovwi_api_key', data.apiKey);
      }
    } finally {
      setLoading(false);
    }
  };

  const runVerify = async () => {
    if (!apiKey) return;
    setLoading(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, email: (window as any).__userEmail })
      });
      const data = await res.json();
      setResponse(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>OVWI Docs</h1>

      <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="API Key" />

      <div style={{ marginTop: 20 }}>
        <button onClick={createKey}>Create Key</button>
        <button onClick={runVerify}>Verify</button>
      </div>

      <pre>{response ? JSON.stringify(response, null, 2) : ''}</pre>

      <div style={{ marginTop: 40 }}>
        <a href={CHECKOUT_PRO}>
          <button>Upgrade Pro</button>
        </a>
      </div>
    </div>
  );
}
