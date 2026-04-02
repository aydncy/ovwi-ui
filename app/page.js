"use client"
import { useState } from "react"
import Link from "next/link"

const PRICING = [
  { name: "Free", limit: "50 verifications/month", price: "$0", href: "/dashboard" },
  { name: "Pro", limit: "1,000 verifications/month", price: "€6", href: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO || "#" , popular: true},
  { name: "Enterprise", limit: "10,000 verifications/month", price: "€18", href: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE || "#" },
  { name: "Scale", limit: "100,000 verifications/month", price: "€49", href: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE || "#" },
]

export default function Page() {
  const [email, setEmail] = useState("aydinceylan07@gmail.com")
  const [payload, setPayload] = useState(`{
  "id": "evt_1234567890",
  "type": "charge.succeeded"
}`)
  const [apiKey, setApiKey] = useState("ovwi_live_onjneyjiwh")
  const [result, setResult] = useState(null)

  const verify = async () => {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: apiKey, email, payload })
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <main className="shell">
      <div className="glow" />

      <nav className="nav">
        <div className="brand">
          <span className="brand-dot" />
          <span>Cyzora</span>
        </div>

        <div className="nav-links">
          <a className="nav-link" href="#demo">Demo</a>
          <a className="nav-link" href="#pricing">Pricing</a>
          <Link href="/dashboard">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </nav>

      <section className="hero" id="demo">
        <div>
          <div className="badge">✨ Now available</div>

          <h1 className="hero-title">
            Stop debugging.
            <br />
            <span className="gradient-text">Start verifying.</span>
          </h1>

          <p className="hero-copy">
            Verify webhooks instantly with real-time feedback, usage tracking,
            plan limits, and zero setup.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard">
              <button className="btn btn-primary">Get Started</button>
            </Link>
            <a href="#pricing">
              <button className="btn btn-secondary">View Pricing</button>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-chip">Realtime verification</div>
            <div className="stat-chip">Monthly limits</div>
            <div className="stat-chip">Production ready</div>
          </div>
        </div>

        <div className="card demo-panel">
          <div className="card-glow" />

          <div className="label">Email</div>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ height: 14 }} />

          <div className="label">Payload</div>
          <textarea
            className="textarea"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
          />

          <div style={{ height: 14 }} />

          <div className="row">
            <button className="btn btn-primary" onClick={verify}>Verify</button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setPayload(`{
  "id": "evt_1234567890",
  "type": "charge.succeeded"
}`)
                setResult(null)
              }}
            >
              Reset
            </button>
          </div>

          {result && (
            <div className="result">
              <div className="result-head">
                <span className="result-dot" />
                <span>Verified</span>
              </div>
              <pre className="code">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How it works</h2>
        <p className="section-copy">
          A simple flow for reliable webhook verification and plan-based usage control.
        </p>

        <div className="steps">
          <div className="card step">
            <div className="step-num">1</div>
            <div className="step-title">Send Webhook</div>
            <div className="step-copy">Paste your webhook payload and send a verification request.</div>
          </div>

          <div className="card step">
            <div className="step-num">2</div>
            <div className="step-title">Verify</div>
            <div className="step-copy">Get instant feedback with plan, usage, and remaining quota.</div>
          </div>

          <div className="card step">
            <div className="step-num">3</div>
            <div className="step-title">Deploy</div>
            <div className="step-copy">Run with confidence using a production-ready verification flow.</div>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <h2 className="section-title">Pricing</h2>
        <p className="section-copy">
          Start free, then upgrade when your volume grows.
        </p>

        <div className="pricing">
          {PRICING.map((p) => (
            <div key={p.name} className={`card price-card ${p.popular ? "popular" : ""}`}>
              <div>
                <div className="price-name">{p.name}</div>
                <div className="price-limit">{p.limit}</div>
                <div className="price-tag">{p.price}</div>
              </div>

              <a href={p.href} target={p.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
                <button className={`btn ${p.popular ? "btn-primary" : "btn-secondary"} price-cta`}>
                  {p.name === "Free" ? "Get Started" : `Get ${p.name}`}
                </button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="footer-space" />
    </main>
  )
}
