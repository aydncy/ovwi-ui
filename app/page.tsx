'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [logs, setLogs] = useState<string[]>([]);

  const runWorkflow = () => {
    setLogs([
      "→ Request received",
      "→ Validating signature",
      "→ Executing workflow",
      "→ Logging execution",
      "✅ Verified & completed"
    ]);
  };

  return (
    <div style={{background:'#050816', minHeight:'100vh', color:'#fff'}}>

      {/* ✅ NAVBAR */}
      <div style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{
          maxWidth:1200,
          margin:'0 auto',
          height:70,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between',
          padding:'0 20px'
        }}>
          <span style={{fontWeight:900}}>OVWI</span>

          <div style={{display:'flex', gap:24}}>
            <Link href="/docs">Docs</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>

      {/* ✅ HERO */}
      <div style={{
        maxWidth:1000,
        margin:'0 auto',
        textAlign:'center',
        padding:'120px 20px'
      }}>
        <h1 style={{fontSize:64,fontWeight:900}}>
          Build Verifiable Workflows
        </h1>

        <p style={{color:'#9fb4d6', marginTop:20}}>
          Infrastructure to run, verify, and audit every execution.
        </p>

        <div style={{marginTop:40, display:'flex', gap:20, justifyContent:'center'}}>
          <button style={{
            padding:'14px 30px',
            background:'linear-gradient(90deg,#2f7dff,#18d6ff)',
            borderRadius:12,
            fontWeight:700,
            border:'none'
          }}>
            Start Building
          </button>

          <Link href="/docs">
            <button style={{
              padding:'14px 30px',
              border:'1px solid rgba(255,255,255,0.1)',
              borderRadius:12
            }}>
              View Docs
            </button>
          </Link>
        </div>
      </div>

      {/* ✅ PLAYGROUND = LOG ENGINE */}
      <div style={{
        maxWidth:900,
        margin:'0 auto',
        padding:'40px 20px'
      }}>

        <button onClick={runWorkflow} style={{
          padding:'12px 20px',
          background:'#0b1223',
          borderRadius:10,
          marginBottom:20
        }}>
          Run Workflow
        </button>

        <div style={{
          background:'#0b1223',
          padding:20,
          borderRadius:16,
          minHeight:200,
          border:'1px solid rgba(255,255,255,0.08)'
        }}>
          {logs.length === 0 ? (
            <p style={{color:'#667'}}>No execution</p>
          ) : (
            logs.map((l, i) => (
              <p key={i} style={{marginBottom:6, color:'#aef'}}>{l}</p>
            ))
          )}
        </div>

      </div>

      {/* ✅ FEATURES */}
      <div style={{
        maxWidth:1100,
        margin:'0 auto',
        padding:'60px 20px',
        display:'grid',
        gridTemplateColumns:'repeat(3,1fr)',
        gap:20
      }}>

        {[
          "Verifiable execution logs",
          "Audit-ready workflow system",
          "API-first infrastructure"
        ].map((t,i)=>(
          <div key={i} style={{
            background:'rgba(255,255,255,0.04)',
            padding:20,
            borderRadius:16
          }}>
            {t}
          </div>
        ))}

      </div>

    </div>
  );
}
