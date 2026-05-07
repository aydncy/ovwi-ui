import {
  Shield,
  BarChart3,
  KeyRound,
  Rocket
} from 'lucide-react'

const products = [
  {
    icon: Shield,
    title: 'Authentication',
    desc: 'Google OAuth, session management and zero flicker auth flows.'
  },
  {
    icon: KeyRound,
    title: 'API Verification',
    desc: 'Issue, verify and monetize production API keys instantly.'
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Track requests, growth, usage and conversion in real time.'
  },
  {
    icon: Rocket,
    title: 'Infrastructure',
    desc: 'Deploy scalable AI products with enterprise-grade reliability.'
  }
]

export default function Home(){

  return (
    <main>

      <div className="container">

        <nav className="nav">

          <div className="logo">
            OVWI
          </div>

          <div className="nav-links">

            <a href="/docs">
              Docs
            </a>

            <a href="/dashboard">
              Dashboard
            </a>

            <a
              href="/login"
              className="btn btn-primary"
            >
              Get API Key
            </a>

          </div>

        </nav>

        <section className="hero">

          <div>

            <div className="badge">
              AI Infrastructure + Monetization
            </div>

            <h1 className="hero-title">
              Build.
              <br />
              Scale.
              <br />
              Monetize.
            </h1>

            <p className="hero-desc">
              Production-grade authentication,
              API verification, analytics,
              onboarding and monetization for
              modern AI products.
            </p>

            <div className="hero-actions">

              <a
                href="/login"
                className="btn btn-primary"
              >
                Start Free
              </a>

              <a
                href="/docs"
                className="btn btn-secondary"
              >
                View Docs
              </a>

            </div>

          </div>

          <div className="glass dashboard-preview">

            <div
              style={{
                display:'flex',
                justifyContent:'space-between',
                marginBottom:20
              }}
            >
              <div>

                <div className="stat-label">
                  Monthly Revenue
                </div>

                <div className="stat-value">
                  $48,320
                </div>

              </div>

              <div
                style={{
                  width:56,
                  height:56,
                  borderRadius:18,
                  background:'linear-gradient(135deg,#3b82f6,#2563eb)'
                }}
              />

            </div>

            <div
              style={{
                padding:18,
                borderRadius:18,
                background:'#020617',
                border:'1px solid rgba(255,255,255,.06)',
                fontFamily:'monospace',
                lineHeight:1.7
              }}
            >
{`POST /api/verify

{
  "apiKey":"ovwi_live_sk_••••"
}

{
  "ok": true,
  "plan": "pro",
  "remaining": 8421
}`}
            </div>

            <div className="stats-grid">

              {[
                ['Requests','2.8M'],
                ['Growth','+182%'],
                ['Latency','42ms'],
                ['Uptime','99.99%']
              ].map(([k,v])=>(

                <div
                  key={k}
                  className="stat-card"
                >
                  <div className="stat-label">
                    {k}
                  </div>

                  <div className="stat-value">
                    {v}
                  </div>
                </div>

              ))}

            </div>

          </div>

        </section>

        <section className="products">

          <div className="badge">
            Platform Products
          </div>

          <div className="products-grid">

            {products.map((item)=>{

              const Icon = item.icon

              return (

                <div
                  key={item.title}
                  className="glass product-card"
                >

                  <Icon size={34} />

                  <div className="product-title">
                    {item.title}
                  </div>

                  <div className="product-desc">
                    {item.desc}
                  </div>

                </div>

              )

            })}

          </div>

        </section>

      </div>

    </main>
  )
}
