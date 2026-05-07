export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#1e3a8a 0%,#0b1120 40%,#020617 100%)',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, sans-serif',
      }}
    >

      {/* glow */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          background: '#2563eb',
          filter: 'blur(140px)',
          opacity: 0.18,
          top: -250,
          right: -200,
          borderRadius: '50%',
        }}
      />

      {/* navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(18px)',
          background: 'rgba(2,6,23,.45)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '22px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: '-0.05em',
            }}
          >
            OVWI
          </div>

          <nav
            style={{
              display: 'flex',
              gap: 28,
              alignItems: 'center',
            }}
          >
            <a
              href="/docs"
              style={{
                color: 'rgba(255,255,255,.72)',
                textDecoration: 'none',
                fontSize: 15,
              }}
            >
              Docs
            </a>

            <a
              href="/login"
              style={{
                padding: '12px 18px',
                borderRadius: 14,
                background:
                  'linear-gradient(135deg,#3b82f6,#2563eb)',
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700,
                boxShadow:
                  '0 10px 40px rgba(37,99,235,.35)',
              }}
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '120px 32px 100px',
          display: 'grid',
          gridTemplateColumns: '1.1fr .9fr',
          gap: 40,
          alignItems: 'center',
        }}
      >

        {/* left */}
        <div>

          <div
            style={{
              display: 'inline-flex',
              padding: '10px 16px',
              borderRadius: 999,
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.08)',
              fontSize: 14,
              marginBottom: 28,
              color: 'rgba(255,255,255,.75)',
            }}
          >
            AI Infrastructure Platform
          </div>

          <h1
            style={{
              fontSize: 'clamp(72px,10vw,120px)',
              lineHeight: .88,
              letterSpacing: '-0.08em',
              margin: 0,
              fontWeight: 900,
            }}
          >
            Build.
            <br />
            Scale.
            <br />
            Monetize.
          </h1>

          <p
            style={{
              marginTop: 34,
              maxWidth: 720,
              fontSize: 22,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,.68)',
            }}
          >
            Authentication, onboarding, analytics,
            monetization and AI infrastructure —
            unified into one modern developer platform.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 18,
              marginTop: 42,
              flexWrap: 'wrap',
            }}
          >

            <a
              href="/login"
              style={{
                padding: '18px 34px',
                borderRadius: 18,
                background:
                  'linear-gradient(135deg,#60a5fa,#2563eb)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: 17,
                boxShadow:
                  '0 20px 60px rgba(37,99,235,.45)',
              }}
            >
              Start Building
            </a>

            <a
              href="/docs"
              style={{
                padding: '18px 34px',
                borderRadius: 18,
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.08)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 17,
                backdropFilter: 'blur(12px)',
              }}
            >
              Documentation
            </a>

          </div>

        </div>

        {/* right dashboard */}
        <div
          style={{
            position: 'relative',
          }}
        >

          <div
            style={{
              borderRadius: 32,
              background: 'rgba(255,255,255,.05)',
              border: '1px solid rgba(255,255,255,.08)',
              backdropFilter: 'blur(18px)',
              padding: 28,
              boxShadow:
                '0 30px 120px rgba(0,0,0,.35)',
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 28,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,.55)',
                  }}
                >
                  Revenue
                </div>

                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 900,
                    marginTop: 8,
                  }}
                >
                  $48,320
                </div>
              </div>

              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background:
                    'linear-gradient(135deg,#3b82f6,#2563eb)',
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 18,
              }}
            >

              {[
                ['API Requests','2.1M'],
                ['Growth','+182%'],
                ['Active Users','18,492'],
                ['Conversion','12.4%'],
              ].map(([k,v]) => (
                <div
                  key={k}
                  style={{
                    borderRadius: 22,
                    padding: 22,
                    background:
                      'rgba(255,255,255,.04)',
                    border:
                      '1px solid rgba(255,255,255,.06)',
                  }}
                >
                  <div
                    style={{
                      color:'rgba(255,255,255,.55)',
                      fontSize:14,
                    }}
                  >
                    {k}
                  </div>

                  <div
                    style={{
                      marginTop:10,
                      fontWeight:900,
                      fontSize:28,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
