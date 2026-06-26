'use client';

import Link from 'next/link';

export default function Home() {

  return (
    <div style={{background:'#050816', minHeight:'100vh', color:'#fff'}}>

      {/* ✅ NAV */}
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
          <b>OVWI</b>

          <div style={{display:'flex', gap:20}}>
            <Link href="/docs">Docs</Link>
            <Link href="/auth/login">Login</Link>
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
          Infrastructure for execution, verification and audit.
        </p>

        <div style={{marginTop:30}}>
          <Link href="/dashboard">
            <button style={{
              padding:'14px 30px',
              background:'linear-gradient(90deg,#2f7dff,#18d6ff)',
              borderRadius:12,
              border:'none',
              fontWeight:700
            }}>
              Open Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* ✅ DASHBOARD PREVIEW */}
      <div style={{
        maxWidth:1100,
        margin:'0 auto',
        padding:'40px 20px'
      }}>

        <div style={{
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:20,
          padding:30,
          boxShadow:'0 20px 60px rgba(0,0,0,.4)'
        }}>

          <h3 style={{marginBottom:20}}>System Overview</h3>

          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(4,1fr)',
            gap:20
          }}>
            {[
              "12,543 requests",
              "$2,847 revenue",
              "89 users",
              "47ms latency"
            ].map((v,i)=>(
              <div key={i} style={{
                background:'#0b1223',
                padding:20,
                borderRadius:12
              }}>
                {v}
              </div>
            ))}
          </div>

          <div style={{
            marginTop:30,
            background:'#0b1223',
            padding:20,
            borderRadius:12
          }}>
            <p style={{color:'#888'}}>Execution logs</p>

            <p style={{color:'#7df'}}>
              → Request received<br/>
              → Validated<br/>
              → Executed<br/>
              ✅ Verified
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
