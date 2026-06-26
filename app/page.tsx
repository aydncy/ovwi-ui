'use client';

import { useState } from 'react';

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
    <div style={{
      minHeight: '100vh',
      background: '#060816',
      color: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* NAV */}
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        padding:'20px 40px',
        borderBottom:'1px solid rgba(255,255,255,0.05)'
      }}>
        <h2 style={{
          fontSize:22,
          fontWeight:800,
          background:'linear-gradient(90deg,#69a8ff,#32d7ff)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent'
        }}>
          OVWI
        </h2>

        <div style={{display:'flex', gap:20}}>
          <span>Docs</span>
          <span>Login</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{textAlign:'center', padding:'120px 20px'}}>

        <h1 style={{
          fontSize:64,
          fontWeight:900,
          lineHeight:1.1,
          marginBottom:20
        }}>
          Turn Bad Content <br />
          Into <span style={{
            background:'linear-gradient(90deg,#7db7ff,#2ee4ff)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent'
          }}>
            SEO Traffic
          </span>
        </h1>

        <p style={{
          color:'#a0b4d4',
          maxWidth:600,
          margin:'auto',
          marginBottom:40
        }}>
          AI API that rewrites your content for better SEO, clarity,
          and ranking in seconds.
        </p>

        <button
          onClick={run}
          style={{
            padding:'14px 28px',
            borderRadius:12,
            fontWeight:700,
            background:'linear-gradient(90deg,#2f7dff,#18d6ff)',
            border:'none',
            color:'#fff',
            cursor:'pointer'
          }}
        >
          🚀 Generate SEO Content
        </button>

        {/* output */}
        <div style={{
          marginTop:30,
          maxWidth:700,
          marginInline:'auto',
          padding:20,
          background:'#0b1223',
          borderRadius:16,
          border:'1px solid rgba(255,255,255,0.08)'
        }}>
          {result || 'Your optimized result will appear here...'}
        </div>

        {/* before after */}
        {result && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            gap:20,
            marginTop:30
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
