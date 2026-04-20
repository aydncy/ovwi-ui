'use client';

import { useState } from 'react';

export default function ApiBox() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    setResult('');

    try {
      // create key
      const keyRes = await fetch('/api/create-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const keyData = await keyRes.json();
      const apiKey = keyData.apiKey;

      localStorage.setItem('ovwi_api_key', apiKey);

      // verify
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });

      const data = await res.json();

      //  LIMIT CHECK
      if (data.upgrade) {
        const url =
          data.checkoutUrl ||
          process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO;

        window.location.href = url;
        return;
      }

      setResult(JSON.stringify(data, null, 2));

    } catch {
      setResult(JSON.stringify({ ok:false, error:"request_failed" }, null, 2));
    }

    setLoading(false);
  };

  return (
    <div className="card verify-card">
      <h3>Live Verify</h3>

      <input
        className="input"
        placeholder="your@email.com"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        style={{marginTop:10}}
      />

      <button
        className="btn-primary"
        onClick={run}
        style={{marginTop:10, width:"100%"}}
      >
        {loading ? "Running..." : "Run Verify"}
      </button>

      {result && (
        <pre style={{
          marginTop:15,
          background:"#020617",
          padding:10,
          borderRadius:10,
          fontSize:12
        }}>
          {result}
        </pre>
      )}
    </div>
  );
}
