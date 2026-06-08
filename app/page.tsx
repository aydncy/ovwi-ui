'use client';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #020617, #020617 60%, #0c1b33)',
      color: 'white',
      position: 'relative',
      padding: '60px'
    }}>

      {/* 🔥 Glow Effect */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
        filter: 'blur(120px)',
        top: '100px',
        left: '200px'
      }} />

      {/* ✅ HERO */}
      <div style={{maxWidth:'900px'}}>

        <h1 style={{
          fontSize:'64px',
          fontWeight:'800',
          lineHeight:'1.1'
        }}>
          Build. Scale.<br/>Monetize APIs.
        </h1>

        <p style={{
          marginTop:'20px',
          fontSize:'18px',
          color:'#94a3b8'
        }}>
          Build and scale production-ready APIs with authentication,
          usage tracking, and monetization built-in.
        </p>

        {/* ✅ CTA */}
        <div style={{marginTop:'30px', display:'flex', gap:'12px'}}>
          <button
            onClick={() => window.location.href='/auth/login'}
            className="verify-btn"
          >
            Start Free →
          </button>

          <button className="nav-btn">
            Try Demo
          </button>
        </div>

        {/* ✅ API EXAMPLE (YUKARI TAŞINDI) */}
        <div style={{
          background:'#0f172a',
          padding:'20px',
          borderRadius:'12px',
          marginTop:'30px',
          maxWidth:'500px'
        }}>
          <p style={{ color:'#888' }}>API Example</p>

          <pre style={{fontSize:'13px'}}>
{`curl -X POST https://ovwi.cyzora.com/api/external-verify
-H "x-api-key: YOUR_KEY"
-d '{"event":"test"}'`}
          </pre>
        </div>

      </div>

      {/* ✅ FEATURES */}
      <section style={{marginTop:'80px'}}>

        <h2 style={{fontSize:'28px'}}>What you get</h2>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'20px',
          marginTop:'30px'
        }}>

          <div style={{
            padding:'20px',
            background:'#111827',
            borderRadius:'12px'
          }}>
            <h3>API Infrastructure</h3>
            <p>Production-ready API with authentication and usage tracking.</p>
          </div>

          <div style={{
            padding:'20px',
            background:'#111827',
            borderRadius:'12px'
          }}>
            <h3>Usage Control</h3>
            <p>Built-in limits and scalable API plans.</p>
          </div>

          <div style={{
            padding:'20px',
            background:'#111827',
            borderRadius:'12px'
          }}>
            <h3>Developer Ready</h3>
            <p>Simple API, fast integration, real-world usage.</p>
          </div>

        </div>

      </section>

      {/* ✅ SOCIAL PROOF */}
      <section style={{
        marginTop:'80px',
        textAlign:'center'
      }}>
        <p style={{ color:'#888' }}>
          Trusted by developers building real applications
        </p>
      </section>

      {/* ✅ FINAL CTA */}
      <section style={{
        marginTop:'100px',
        textAlign:'center'
      }}>
        <h2>Start building today</h2>

        <button
          onClick={() => window.location.href='/auth/login'}
          className="verify-btn"
          style={{marginTop:'20px'}}
        >
          Get Started
        </button>
      </section>

    </div>
  );
}
