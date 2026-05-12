'use client'

import Link from 'next/link'

export default function Home() {

  return (
    <main className="landing">

      <header className="topbar">

        <div className="logo">
          OVWI
        </div>

        <div className="toplinks">

          <Link href="/docs">
            Docs
          </Link>

          <Link
            href="/login"
            className="primary-btn"
          >
            Login
          </Link>

        </div>

      </header>

      <section className="hero">

        <div className="hero-left">

          <div className="badge">
            Now available
          </div>

          <h1>
            Stop debugging.
            <br />
            Start <span>verifying.</span>
          </h1>

          <p>
            Verify webhooks instantly with
            real-time feedback, live usage
            tracking, and upgrade paths built
            in from day one.
          </p>

          <div className="hero-actions">

            <Link
              href="/login"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              href="/docs"
              className="secondary-btn"
            >
              View Docs
            </Link>

          </div>

          <div className="stats">

            <div>
              <strong>1M+</strong>
              <span>Verifications</span>
            </div>

            <div>
              <strong>99.9%</strong>
              <span>Success Rate</span>
            </div>

            <div>
              <strong>45ms</strong>
              <span>Latency</span>
            </div>

          </div>

        </div>

        <div className="verify-box">

          <label>Email</label>

          <input
            value="Login required"
            readOnly
          />

          <label>Payload</label>

          <textarea
            readOnly
            value={`{
  "id": "evt_123456789",
  "type": "charge.succeeded"
}`}
          />

          <label>API Key</label>

          <input
            value="Generated after login"
            readOnly
          />

          <div className="verify-actions">

            <button className="primary-btn">
              Verify Webhook
            </button>

            <button className="secondary-btn">
              Reset
            </button>

          </div>

        </div>

      </section>

      <section className="pricing">

        <h2>
          Simple Pricing
        </h2>

        <div className="pricing-grid">

          <div className="price-card">

            <h3>Starter</h3>

            <p>50 / month</p>

            <strong>$0</strong>

            <button className="secondary-btn">
              Get Started
            </button>

          </div>

          <div className="price-card featured">

            <div className="popular">
              MOST POPULAR
            </div>

            <h3>Pro</h3>

            <p>1,000 / month</p>

            <strong>€6</strong>

            <a
              href={
                process.env
                  .NEXT_PUBLIC_LEMON_CHECKOUT_PRO
              }
              className="primary-btn"
            >
              Get Started
            </a>

          </div>

          <div className="price-card">

            <h3>Enterprise</h3>

            <p>10,000 / month</p>

            <strong>€18</strong>

            <a
              href={
                process.env
                  .NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE
              }
              className="secondary-btn"
            >
              Get Started
            </a>

          </div>

          <div className="price-card">

            <h3>Scale</h3>

            <p>100,000 / month</p>

            <strong>€49</strong>

            <a
              href={
                process.env
                  .NEXT_PUBLIC_LEMON_CHECKOUT_SCALE
              }
              className="secondary-btn"
            >
              Get Started
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}
