'use client';

import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<any>(null);

  const runDemo = async () => {
    const res = await fetch('/api/demo', { method: 'POST' });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="hero">

      <div>
        <h1>
          Build. Scale. Monetize APIs.
        </h1>

        <p>
          Production-ready API infrastructure with authentication,
          API keys, usage tracking, and monetization.
        </p>

        <div className="hero-actions">
          <button onClick={() => window.location.href = '/auth/login'} className="verify-btn">
            Start Free
          </button>

          <button onClick={runDemo} className="nav-btn">
            Try Demo
          </button>
        </div>

        {result && (
          <pre style={{ marginTop: 20 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>

<section style={{marginTop:'80px'}}>
  <h2>What you get</h2>

  <div style={{display:'flex',gap:'20px',marginTop:'20px'}}>
    <div>
      <h3>API Infrastructure</h3>
      <p>Production-ready API with authentication and usage tracking.</p>
    </div>

    <div>
      <h3>Usage Control</h3>
      <p>Built-in limits, tracking, and scalable plans.</p>
    </div>

    <div>
      <h3>Developer Ready</h3>
      <p>Simple API, fast integration, real-world usage.</p>
    </div>
  </div>
</section>

      <div className="hero-card">
        <span className="label">API Example</span>

        <pre>
{`curl -X POST https://ovwi.cyzora.com/api/external-verify
-H "x-api-key: YOUR_KEY"
-d '{"event":"test"}'`}
        </pre>

        <p style={{ marginTop: 10 }}>
          
        </p>

      </div>

    </div>
  );
}

<section style={{ marginTop: "80px", textAlign: "center" }}>
  <p style={{ color: "#888" }}>
    Trusted by developers building real applications
  </p>
</section>
