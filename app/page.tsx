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

<PricingSection />
    </main>
  )
}

function PricingSection(){

  const pro =
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO

  const scale =
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE

  const enterprise =
    process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE

  const plans = [
    {
      name:'Pro',
      price:'$29',
      desc:'For indie AI builders',
      href:pro
    },
    {
      name:'Scale',
      price:'$199',
      desc:'For growing startups',
      href:scale
    },
    {
      name:'Enterprise',
      price:'Custom',
      desc:'Advanced infra and support',
      href:enterprise
    }
  ]

  return (

    <section
      style={{
        padding:'40px 0 120px'
      }}
    >

      <div className="badge">
        Monetization
      </div>

      <div
        className="products-grid"
        style={{
          marginTop:30
        }}
      >

        {plans.map(plan=>(

          <div
            key={plan.name}
            className="glass product-card"
          >

            <div
              style={{
                fontSize:28,
                fontWeight:900
              }}
            >
              {plan.name}
            </div>

            <div
              style={{
                marginTop:10,
                fontSize:46,
                fontWeight:900
              }}
            >
              {plan.price}
            </div>

            <div
              className="product-desc"
            >
              {plan.desc}
            </div>

            <a
              href={plan.href || '/login'}
              className="btn btn-primary"
              style={{
                display:'inline-block',
                marginTop:24
              }}
            >
              Upgrade
            </a>

          </div>

        ))}

      </div>

    </section>

  )
}

