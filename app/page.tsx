'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);

    const res = await fetch('/api/ovwi', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ text:"bad seo content example" })
    });

    const data = await res.json();
    setResult(data?.data?.optimized_text || 'error');

    setLoading(false);
  };

  return (
    <div style={{background:'#050816', minHeight:'100vh', color:'#fff'}}>

      {/* ✅ NAVBAR */}
      <div style={{
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        backdropFilter:'blur(12px)'
      }}>
        <div style={{
          maxWidth:1200,
          margin:'0 auto',
          height:70,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          padding:'0 20px'
        }}>

          <Link href="/">
            <div style={{
              fontWeight:900,
              fontSize:20,
              background:'linear-gradient(90deg,#69a8ff,#32d7ff)',
              WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent',
              cursor:'pointer'
            }}>
              OVWI
            </div>
          </Link>

          <div style={{
            display:'flex',
            alignItems:'center',
            gap:24
          }}>

            <Link href="/docs">
              <span style={{cursor:'pointer', color:'#9fb4d6'}}>
                Docs
              </span>
            </Link>

            <Link href="/auth/login">
              <div style={{
                padding:'8px 16px',
                borderRadius:10,
                background:'linear-gradient(90deg,#2f7dff,#18d6ff)',
                fontWeight:600,
                cursor:'pointer'
              }}>
                Login
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* ✅ HERO */}
      <div style={{
        maxWidth:1100,
        margin:'0 auto',
        padding:'120px 20px 60px',
        textAlign:'center'
      }}>

        <h1 style={{
          fontSize:72,
          fontWeight:900,
          lineHeight:1.05,
          marginBottom:20
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
          color:'#9fb4d6',
          fontSize:18,
          marginBottom:40
        }}>
          Generate optimized SEO content instantly with AI.
        </p>

        <button
          onClick={run}
          style={{
            padding:'14px 36px',
            borderRadius:14,
            fontWeight:700,
            fontSize:16,
            background:'linear-gradient(90deg,#2f7dff,#18d6ff)',
            border:'none',
            cursor:'pointer',
            boxShadow:'0 10px 30px rgba(47,125,255,.35)'
          }}
        >
          {loading ? 'Running...' : '🚀 Generate SEO Content'}
        </button>

        {/* ✅ OUTPUT PANEL */}
        <div style={{
          marginTop:50,
          borderRadius:20,
          padding:30,
          textAlign:'left',
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
          boxShadow:'0 20px 60px rgba(0,0,0,.4)'
        }}>
          <pre style={{whiteSpace:'pre-wrap'}}>
            {result || 'Your optimized output will appear here'}
          </pre>
        </div>

        {/* ✅ BEFORE AFTER */}
        {result && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            gap:20,
            marginTop:30
          }}>
            <div style={{
              background:'rgba(255,0,0,0.08)',
              padding:20,
              borderRadius:16
            }}>
              <p style={{color:'#ff4d4d'}}>Before</p>
              <p>bad seo content example</p>
            </div>

            <div style={{
              background:'rgba(0,255,140,0.08)',
              padding:20,
              borderRadius:16
            }}>
              <p style={{color:'#00ffa0'}}>After</p>
              <p>{result}</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
