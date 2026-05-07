export default function Home() {

  return (
    <main
      style={{
        minHeight:'100vh',
        background:'#050816',
        color:'white',
        fontFamily:'Inter, sans-serif'
      }}
    >

      {/* NAV */}
      <header
        style={{
          borderBottom:'1px solid rgba(255,255,255,.06)',
          position:'sticky',
          top:0,
          backdropFilter:'blur(18px)',
          background:'rgba(5,8,22,.7)',
          zIndex:50
        }}
      >
        <div
          style={{
            maxWidth:1300,
            margin:'0 auto',
            padding:'20px 32px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >

          <div
            style={{
              fontWeight:900,
              fontSize:28
            }}
          >
            OVWI
          </div>

          <div
            style={{
              display:'flex',
              gap:16,
              alignItems:'center'
            }}
          >

            <a
              href="/docs"
              style={{
                color:'rgba(255,255,255,.7)',
                textDecoration:'none'
              }}
            >
              Docs
            </a>

            <a
              href="/dashboard"
              style={{
                color:'rgba(255,255,255,.7)',
                textDecoration:'none'
              }}
            >
              Dashboard
            </a>

            <a
              href="/login"
              style={{
                background:'#2563eb',
                padding:'12px 18px',
                borderRadius:14,
                textDecoration:'none',
                color:'white',
                fontWeight:700
              }}
            >
              Get API Key
            </a>

          </div>

        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          maxWidth:1300,
          margin:'0 auto',
          padding:'90px 32px'
        }}
      >

        <div
          style={{
            display:'grid',
            gridTemplateColumns:'1.1fr .9fr',
            gap:40,
            alignItems:'center'
          }}
        >

          {/* LEFT */}
          <div>

            <div
              style={{
                display:'inline-flex',
                padding:'10px 14px',
                border:'1px solid rgba(255,255,255,.08)',
                borderRadius:999,
                background:'rgba(255,255,255,.03)',
                marginBottom:28,
                color:'rgba(255,255,255,.7)'
              }}
            >
              AI Infrastructure + API Monetization
            </div>

            <h1
              style={{
                fontSize:'clamp(64px,9vw,110px)',
                lineHeight:.9,
                margin:0,
                letterSpacing:'-0.08em'
              }}
            >
              Ship AI
              <br />
              products
              <br />
              faster.
            </h1>

            <p
              style={{
                marginTop:30,
                fontSize:22,
                lineHeight:1.7,
                color:'rgba(255,255,255,.68)',
                maxWidth:700
              }}
            >
              Authentication, API verification,
              analytics, monetization, onboarding
              and infrastructure — unified into one
              developer platform.
            </p>

            <div
              style={{
                display:'flex',
                gap:18,
                marginTop:40
              }}
            >

              <a
                href="/login"
                style={{
                  padding:'18px 30px',
                  background:'#2563eb',
                  borderRadius:18,
                  color:'white',
                  textDecoration:'none',
                  fontWeight:800
                }}
              >
                Start Free
              </a>

              <a
                href="/docs"
                style={{
                  padding:'18px 30px',
                  border:'1px solid rgba(255,255,255,.08)',
                  borderRadius:18,
                  color:'white',
                  textDecoration:'none',
                  background:'rgba(255,255,255,.03)'
                }}
              >
                Read Docs
              </a>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <div
              style={{
                border:'1px solid rgba(255,255,255,.08)',
                borderRadius:28,
                background:'rgba(255,255,255,.03)',
                padding:24
              }}
            >

              <div
                style={{
                  display:'flex',
                  justifyContent:'space-between',
                  marginBottom:20
                }}
              >
                <div style={{fontWeight:700}}>
                  Live API Verify
                </div>

                <div
                  style={{
                    color:'#4ade80'
                  }}
                >
                  operational
                </div>
              </div>

              <div
                style={{
                  background:'#020617',
                  borderRadius:18,
                  padding:18,
                  border:'1px solid rgba(255,255,255,.06)',
                  fontFamily:'monospace',
                  fontSize:14,
                  overflow:'auto'
                }}
              >
{`POST /api/verify

{
  "apiKey":"ovwi_live_sk_••••"
}

response:

{
  "ok": true,
  "plan": "pro",
  "remaining": 8421
}`}
              </div>

              <div
                style={{
                  marginTop:22,
                  display:'grid',
                  gridTemplateColumns:'1fr 1fr',
                  gap:16
                }}
              >

                {[
                  ['Requests','2.8M'],
                  ['MRR','$48k'],
                  ['Latency','42ms'],
                  ['Uptime','99.99%']
                ].map(([k,v]) => (

                  <div
                    key={k}
                    style={{
                      border:'1px solid rgba(255,255,255,.06)',
                      borderRadius:18,
                      padding:18,
                      background:'rgba(255,255,255,.03)'
                    }}
                  >
                    <div
                      style={{
                        color:'rgba(255,255,255,.55)',
                        fontSize:14
                      }}
                    >
                      {k}
                    </div>

                    <div
                      style={{
                        marginTop:8,
                        fontSize:28,
                        fontWeight:900
                      }}
                    >
                      {v}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
