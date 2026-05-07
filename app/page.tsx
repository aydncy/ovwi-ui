export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top,#13254a 0%,#081120 45%,#050b16 100%)',
        color: 'white',
        overflow: 'hidden',
      }}
    >

      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '140px 32px 120px',
          position: 'relative',
        }}
      >

        <div
          style={{
            display: 'inline-flex',
            padding: '8px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
            fontSize: 14,
            marginBottom: 28,
            color: 'rgba(255,255,255,.82)',
          }}
        >
          AI Infrastructure Platform
        </div>

        <h1
          style={{
            fontSize: 'clamp(58px,10vw,110px)',
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: '-0.06em',
            margin: 0,
            maxWidth: 980,
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
            color: 'rgba(255,255,255,.72)',
          }}
        >
          OVWI gives developers a production-ready AI infrastructure:
          authentication, analytics, API management, monetization,
          onboarding and growth systems in one platform.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 18,
            marginTop: 46,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/login"
            style={{
              padding: '18px 34px',
              borderRadius: 18,
              background:
                'linear-gradient(135deg,#42a5ff 0%,#2563eb 100%)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 17,
              boxShadow: '0 10px 40px rgba(37,99,235,.45)',
            }}
          >
            Start Free
          </a>

          <a
            href="/docs"
            style={{
              padding: '18px 34px',
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,.12)',
              background: 'rgba(255,255,255,.04)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 17,
              backdropFilter: 'blur(10px)',
            }}
          >
            View Docs
          </a>
        </div>

        <div
          style={{
            marginTop: 90,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 24,
          }}
        >

          {[
            ['Authentication','Google OAuth + zero flicker session system'],
            ['Analytics','Real-time usage and revenue tracking'],
            ['Monetization','Subscription and API upgrade flows'],
            ['Infrastructure','Production-grade deployment architecture'],
          ].map(([title,desc]) => (
            <div
              key={title}
              style={{
                borderRadius: 28,
                padding: 28,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 22,
                  marginBottom: 14,
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: 'rgba(255,255,255,.7)',
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                {desc}
              </p>
            </div>
          ))}

        </div>

      </section>

    </main>
  )
}
