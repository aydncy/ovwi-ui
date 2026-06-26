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
    <div style={{
      minHeight: '100vh',
      background: '#060816',
      color: '#fff'
    }}>

      {/* ✅ NAVBAR */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}>

          <Link href="/">
            <span style={{
              fontWeight: 900,
              fontSize: 20,
              background: 'linear-gradient(90deg,#69a8ff,#32d7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
            }}>
              OVWI
            </span>
          </Link>

          <div style={{display:'flex', gap:20}}>

            <Link href="/docs">
              <span style={{cursor:'pointer'}}>
                Docs
              </span>
            </Link>

            <Link href="/auth/login">
              <span style={{
                cursor:'pointer',
                padding:'6px 12px',
                borderRadius:8,
                background:'#0b1223'
              }}>
                Login
              </span>
            </Link>

          </div>

        </div>
      </div>

      {/* ✅ HERO */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: 20,
        paddingRight: 20
      }}>

        <h1 style={{
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 20
        }}>
          Turn Bad Content <br />
          <span style={{
            background:'linear-gradient(90deg,#7db7ff,#2ee4ff)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent'
          }}>
            Into SEO Traffic
          </span>
        </h1>

        <p style={{
          color: '#9fb4d6',
          marginBottom: 40,
          fontSize: 18
        }}>
          AI API that rewrites your content for better SEO and ranking.
        </p>

        <button
          onClick={run}
          style={{
            padding: '14px 28px',
            borderRadius: 12,
            fontWeight: 700,
            background: 'linear-gradient(90deg,#2f7dff,#18d6ff)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Running...' : '🚀 Generate SEO Content'}
        </button>

        {/* ✅ OUTPUT */}
        <div style={{
          marginTop: 40,
          padding: 20,
          background: '#0b1223',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          {result || 'Your optimized output will appear here...'}
        </div>

        {/* ✅ BEFORE / AFTER */}
        {result && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            gap:20,
            marginTop:20
          }}>

            <div style={{
              background:'rgba(255,0,0,0.08)',
              padding:15,
              borderRadius:12
            }}>
              <p style={{color:'red'}}>Before</p>
              <p>bad seo content example</p>
            </div>

            <div style={{
              background:'rgba(0,255,0,0.08)',
              padding:15,
              borderRadius:12
            }}>
              <p style={{color:'lime'}}>After</p>
              <p>{result}</p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
