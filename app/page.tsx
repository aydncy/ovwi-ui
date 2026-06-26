'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [result, setResult] = useState('');

  const run = async () => {
    const res = await fetch('/api/ovwi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: "bad seo content example" })
    });

    const data = await res.json();
    setResult(data?.data?.optimized_text || 'error');
  };

  return (
    <div style={{minHeight: '100vh', background: '#060816', color: '#fff'}}>

      {/* ✅ NAVBAR FIXED */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '0 20px'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>

          <Link href="/">
            <h2 style={{
              fontWeight: 900,
              cursor: 'pointer'
            }}>
              OVWI
            </h2>
          </Link>

          <div style={{
            display: 'flex',
            gap: 20
          }}>

            <Link href="/docs">
              <span style={{
                cursor: 'pointer'
              }}>
                Docs
              </span>
            </Link>

            <Link href="/auth/login">
              <span style={{
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: 8,
                background: '#0b1223'
              }}>
                Login
              </span>
            </Link>

          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{textAlign:'center', paddingTop:100}}>

        <h1 style={{fontSize:60, fontWeight:900}}>
          Turn Bad Content <br />
          Into SEO Traffic
        </h1>

        <button
          onClick={run}
          style={{
            marginTop:20,
            padding:'12px 24px',
            borderRadius:10,
            background:'linear-gradient(90deg,#2f7dff,#18d6ff)',
            border:'none',
            color:'#fff',
            cursor:'pointer'
          }}
        >
          🚀 Generate SEO Content
        </button>

        <div style={{
          marginTop:30,
          maxWidth:600,
          marginInline:'auto',
          padding:20,
          background:'#0b1223',
          borderRadius:12
        }}>
          {result || 'Result here'}
        </div>

      </div>

    </div>
  );
}
