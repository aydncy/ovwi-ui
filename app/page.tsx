import Link from 'next/link'
import VerifyBox from './components/VerifyBox'

export default function Home(){

  return (
    <main
      style={{
        minHeight:'100vh',
        background:
          'radial-gradient(circle at top,#0f172a,#020617)',
        color:'white',
        overflow:'hidden'
      }}
    >

      <section
        style={{
          maxWidth:1280,
          margin:'0 auto',
          padding:'120px 40px'
        }}
      >

        <div
          style={{
            display:'grid',
            gridTemplateColumns:
              '1.2fr 1fr',
            gap:60,
            alignItems:'center'
          }}
        >

          <div>

            <div
              style={{
                display:'inline-flex',
                padding:'10px 16px',
                borderRadius:999,
                background:
                  'rgba(59,130,246,.12)',
                border:
                  '1px solid rgba(59,130,246,.25)',
                marginBottom:26,
                fontSize:14,
                fontWeight:700,
                color:'#93c5fd'
              }}
            >
              AI Infrastructure Platform
            </div>

            <h1
              style={{
                fontSize:78,
                lineHeight:1,
                margin:'0 0 24px',
                fontWeight:900
              }}
            >
              Build.
              <br/>
              Scale.
              <br/>
              Monetize.
            </h1>

            <p
              style={{
                fontSize:20,
                opacity:.7,
                maxWidth:760,
                lineHeight:1.7
              }}
            >
              Production-ready AI infrastructure
              with authentication, analytics,
              onboarding, monetization,
              API management and growth systems.
            </p>

            <div
              style={{
                display:'flex',
                gap:18,
                marginTop:40
              }}
            >

              <Link
                href="/login"
                style={{
                  background:
                    'linear-gradient(90deg,#2563eb,#06b6d4)',
                  color:'white',
                  textDecoration:'none',
                  padding:'18px 30px',
                  borderRadius:18,
                  fontWeight:800,
                  fontSize:16,
                  boxShadow:
                    '0 20px 60px rgba(37,99,235,.35)'
                }}
              >
                Start Free
              </Link>

              <Link
                href="/docs"
                style={{
                  background:
                    'rgba(255,255,255,.05)',
                  color:'white',
                  textDecoration:'none',
                  padding:'18px 30px',
                  borderRadius:18,
                  border:
                    '1px solid rgba(255,255,255,.08)',
                  fontWeight:700
                }}
              >
                View Docs
              </Link>

            </div>

            <VerifyBox />

          </div>

          <div>

            <div
              style={{
                background:
                  'rgba(255,255,255,.04)',
                border:
                  '1px solid rgba(255,255,255,.08)',
                borderRadius:32,
                padding:32,
                backdropFilter:'blur(20px)'
              }}
            >

              <div
                style={{
                  display:'grid',
                  gridTemplateColumns:'1fr 1fr',
                  gap:18
                }}
              >

                {[
                  ['Authentication','Google OAuth'],
                  ['Analytics','Realtime tracking'],
                  ['Monetization','Upgrade flows'],
                  ['API Keys','Instant verify'],
                  ['Growth','Activation boost'],
                  ['Infrastructure','Production ready']
                ].map(([t,d])=>(

                  <div
                    key={t}
                    style={{
                      background:'#0f172a',
                      borderRadius:24,
                      padding:24,
                      border:
                        '1px solid rgba(255,255,255,.05)'
                    }}
                  >

                    <div
                      style={{
                        fontSize:18,
                        fontWeight:800,
                        marginBottom:10
                      }}
                    >
                      {t}
                    </div>

                    <div
                      style={{
                        opacity:.65,
                        lineHeight:1.6
                      }}
                    >
                      {d}
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
