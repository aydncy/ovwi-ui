'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);

    const res = await fetch('/api/ovwi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: "bad seo content example" })
    });

    const data = await res.json();
    setResult(data?.data?.optimized_text || 'error');

    setLoading(false);
  };

  return (
    <div>

      {/* NAV */}
      <div className="nav">
        <div className="container" style={{display:'flex', justifyContent:'space-between'}}>
          
          <Link href="/">
            <span className="gradient-text" style={{fontWeight:900}}>
              OVWI
            </span>
          </Link>

          <div style={{display:'flex', gap:20}}>
            <Link href="/docs">Docs</Link>
            <Link href="/auth/login">Login</Link>
          </div>

        </div>
      </div>

      {/* HERO */}
      <div className="container" style={{textAlign:'center', paddingTop:120}}>

        <h1 className="hero-title">
          Turn Bad Content <br />
          <span className="gradient-text">Into SEO Traffic</span>
        </h1>

        <p style={{color:'#9fb4d6', marginTop:20, marginBottom:40}}>
          AI API that rewrites your content for better ranking.
        </p>

        <button className="btn" onClick={run}>
          {loading ? 'Running...' : '🚀 Generate SEO Content'}
        </button>

        <div className="card" style={{marginTop:40, padding:20}}>
          {result || 'Your optimized output will appear here'}
        </div>

        {result && (
          <div className="compare">
            <div className="before">
              <p>Before</p>
              <p>bad seo content example</p>
            </div>

            <div className="after">
              <p>After</p>
              <p>{result}</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
