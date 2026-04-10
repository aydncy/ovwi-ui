'use client';

import { useState } from 'react';
import { getCheckoutLink } from '@/lib/checkout';

export default function DocsPage() {
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const CHECKOUT_PRO = getCheckoutLink('pro');

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
        body: JSON.stringify({ apiKey })
      });
      const data = await res.json();
      setResponse(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">OVWI</a>
          <div className="nav-links">
            <a href="/"><button className="btn btn-secondary btn-small">Home</button></a>
            <a href="/dashboard"><button className="btn btn-secondary btn-small">Dashboard</button></a>
            <a href="/auth/login"><button className="btn btn-primary btn-small">Login</button></a>
          </div>
        </div>
      </nav>

      <section className="docs-hero">
        <div>
          <div className="kicker">Developer Docs</div>
          <h1 className="docs-title">Verify usage. Enforce limits. Upgrade users.</h1>
          <p className="docs-copy">OVWI gives you a clean request verification endpoint, request counting, and an upgrade path when the free plan runs out.</p>

          <div className="pill-row">
            <div className="pill">POST /api/create-key</div>
            <div className="pill">POST /api/verify</div>
            <div className="pill">Free 50 requests</div>
            <div className="pill">Upgrade-ready</div>
          </div>
        </div>

        <div className="docs-stack">
          <div className="card docs-card">
            <div className="field">
              <label className="label">API Key</label>
              <input className="input-mono" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Click Create Key first" />
            </div>

            <div className="helper-row">
              <button className="btn btn-primary" onClick={createKey} disabled={loading}>{loading ? 'Loading...' : 'Create Key'}</button>
              <button className="btn btn-secondary" onClick={runVerify} disabled={!apiKey || loading}>Run Verify</button>
            </div>
          </div>

          <div className="card docs-card">
            <div className="label">Quick cURL</div>
            <pre className="code-block">{`curl -X POST https://ovwi.cyzora.com/api/verify \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"YOUR_KEY"}'`}</pre>
          </div>

          <div className="card docs-card">
            <div className="label">Response</div>
            <pre className="code-block">{response ? JSON.stringify(response, null, 2) : `{\n  "ok": true,\n  "usage": 1,\n  "limit": 50,\n  "remaining": 49\n}`}</pre>
          </div>

          <div className="card docs-card">
            <div className="label">Upgrade</div>
            <p style={{ color: '#c7d7ef', marginTop: 0, lineHeight: 1.7 }}>When the free plan is exhausted, redirect users to a paid plan checkout.</p>
            <a href={CHECKOUT_PRO}><button className="btn btn-primary">Buy Pro</button></a>
          </div>
        </div>
      </section>
    </div>
  );
}
