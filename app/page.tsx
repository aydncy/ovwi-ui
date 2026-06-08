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

      {/* 🔥 MULTI LAYER GLOW */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)',
        filter: 'blur(140px)',
        top: '80px',
        left: '180px'
      }} />

      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)',
        filter: 'blur(120px)',
        top: '200px',
        right: '200px'
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

        {/* 🔥 CTA */}
        <div style={{marginTop:'30px', display:'flex', gap:'12px'}}>

          <button
            onClick={() => window.location.href='/auth/login'}
            style={{
              padding:'16px 32px',
              borderRadius:'10px',
              background:'linear-gradient(90deg,#3b82f6,#06b6d4)',
              border:'none',
              color:'white',
              fontWeight:'700',
              cursor:'pointer',
              boxShadow:'0 20px 50px rgba(59,130,246,0.5)',
              transition:'all 0.2s ease'
            }}
            onMouseOver={(e)=>{
              e.currentTarget.style.transform='translateY(-3px)';
              e.currentTarget.style.boxShadow='0 30px 60px rgba(59,130,246,0.7)';
            }}
            onMouseOut={(e)=>{
              e.currentTarget.style.transform='translateY(0)';
              e.currentTarget.style.boxShadow='0 20px 50px rgba(59,130,246,0.5)';
            }}
          >
            Start Free →
          </button>

          <button style={{
            padding:'14px 20px',
            borderRadius:'8px',
            background:'#111827',
            border:'1px solid #1f2937',
            color:'#ccc',
            cursor:'pointer'
          }}>
            Try Demo
          </button>

        </div>

        {/* ✅ API */}
        <div style={{
          background:'#0f172a',
          padding:'20px',
          borderRadius:'12px',
          marginTop:'30px',
          maxWidth:'500px',
          border:'1px solid #1f2937'
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
      <section style={{marginTop:'110px'}}>

        <h2 style={{fontSize:'28px'}}>What you get</h2>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'20px',
          marginTop:'30px'
        }}>

          {[{
            title:"API Infrastructure",
            desc:"Production-ready API with authentication and usage tracking."
          },
          {
            title:"Usage Control",
            desc:"Built-in limits and scalable API plans."
          },
          {
            title:"Developer Ready",
            desc:"Simple API, fast integration, real-world usage."
          }].map((card, i)=>(
            <div key={i}
              style={{
                padding:'24px',
                background:'#0f172a',
                borderRadius:'12px',
                border:'1px solid #1f2937',
                transition:'all 0.25s ease',
                cursor:'pointer'
              }}
              onMouseOver={(e)=>{
                e.currentTarget.style.transform='translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow='0 20px 60px rgba(0,0,0,0.6)';
              }}
              onMouseOut={(e)=>{
                e.currentTarget.style.transform='translateY(0) scale(1)';
                e.currentTarget.style.boxShadow='none';
              }}
            >
              <h3>{card.title}</h3>
              <p style={{color:'#9ca3af'}}>{card.desc}</p>
            </div>
          ))}

        </div>

      </section>

      {/* 🔥 URGENCY BLOCK */}
      <section style={{
        marginTop:'80px',
        textAlign:'center'
      }}>
        <p style={{color:'#f59e0b'}}>
          Limited free quota — upgrade to scale your usage
        </p>
      </section>

      {/* ✅ FINAL CTA */}
      <section style={{
        marginTop:'120px',
        textAlign:'center'
      }}>

        <h2 style={{fontSize:'32px'}}>Start building today</h2>

        <button
          onClick={() => window.location.href='/auth/login'}
          style={{
            marginTop:'20px',
            padding:'18px 50px',
            borderRadius:'12px',
            background:'linear-gradient(90deg,#3b82f6,#06b6d4)',
            border:'none',
            color:'white',
            fontSize:'18px',
            fontWeight:'700',
            cursor:'pointer',
            boxShadow:'0 25px 80px rgba(59,130,246,0.6)'
          }}
        >
          Get Started
        </button>

      </section>

    </div>
  );
}
