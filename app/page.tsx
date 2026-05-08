'use client'

import { useEffect, useState } from 'react'
import {
  Shield,
  BarChart3,
  KeyRound,
  Rocket,
  CheckCircle2
} from 'lucide-react'

const products = [
  {
    icon: Shield,
    title: 'Authentication',
    desc: 'Google OAuth and zero flicker auth.'
  },
  {
    icon: KeyRound,
    title: 'API Verification',
    desc: 'Issue and verify production API keys.'
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    desc: 'Track usage and growth in real time.'
  },
  {
    icon: Rocket,
    title: 'Infrastructure',
    desc: 'Enterprise-grade AI deployment stack.'
  }
]

function VerifyDemo(){

  const [step,setStep] = useState(0)

  useEffect(()=>{

    const t = setInterval(()=>{

      setStep(v => (v + 1) % 4)

    },1200)

    return ()=>clearInterval(t)

  },[])

  const states = [
    'Initializing request...',
    'Validating API key...',
    'Loading usage limits...',
    'Verification successful'
  ]

  return (

    <div
      style={{
        marginTop:20,
        borderRadius:18,
        padding:18,
        background:'#020617',
        border:'1px solid rgba(255,255,255,.06)',
        fontFamily:'monospace'
      }}
    >

      <div
        style={{
          color:'#4ade80',
          marginBottom:14
        }}
      >
        POST /api/verify
      </div>

      <div
        style={{
          color:'rgba(255,255,255,.7)',
          minHeight:24
        }}
      >
        {states[step]}
      </div>

      {step === 3 && (

        <div
          style={{
            marginTop:16,
            padding:14,
            borderRadius:14,
            background:'rgba(74,222,128,.08)',
            border:'1px solid rgba(74,222,128,.2)',
            display:'flex',
            alignItems:'center',
            gap:10
          }}
        >

          <CheckCircle2 size={18} />

          <span>
            PRO PLAN • 8421 REQUESTS LEFT
          </span>

        </div>

      )}

    </div>

  )

}

function PricingSection(){

  const plans = [
    {
      name:'Pro',
      price:'$29',
      desc:'For indie AI builders',
      href:process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
    },
    {
      name:'Scale',
      price:'$199',
      desc:'For growing startups',
      href:process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE
    },
    {
      name:'Enterprise',
      price:'Custom',
      desc:'Advanced infra and support',
      href:process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE
    }
  ]

  return (

    <section
      style={{
        padding:'40px 0 120px'
      }}
    >

      <div className="badge">
        Pricing
      </div>

      <div className="products-grid">

        {plans.map(plan=>(

          <div
            key={plan.name}
            className="glass product-card"
          >

            <div
              style={{
                fontSize:30,
                fontWeight:900
              }}
            >
              {plan.name}
            </div>

            <div
              style={{
                marginTop:12,
                fontSize:48,
                fontWeight:900
              }}
            >
              {plan.price}
            </div>

            <div className="product-desc">
              {plan.desc}
            </div>

            <a
              href={plan.href || '/login'}
              className="btn btn-primary"
              style={{
                marginTop:24,
                display:'inline-block'
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
              Authentication, API verification,
              analytics and monetization for
              AI products.
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
                justifyContent:'space-between'
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

            <VerifyDemo />

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

            {products.map(item=>{

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

        <PricingSection />

      </div>

    </main>

  )

}
