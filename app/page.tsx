import VerifyBox from "./components/VerifyBox"
import Link from 'next/link'

export default function Home(){

  return (
    <main>

      <header className="topbar">

        <div className="container topbar-inner">

          <div className="logo">
            OVWI
          </div>

          <nav className="nav">

            <Link href="/">
              Home
            </Link>

            <Link href="/docs">
              Docs
            </Link>

            <Link href="/dashboard">
              Dashboard
            </Link>

            <Link
              href="/login"
              className="primary-btn"
            >
              Login
            </Link>

          </nav>

        </div>

      </header>

      <section className="hero">

        <div className="container hero-grid">

          <div>

            <div className="badge">
              AI Infrastructure Platform
            </div>

            <h1>
              Build.
              <br />
              Scale.
              <br />
              <span>Monetize.</span>
            </h1>

            <p>
              OVWI gives developers a
              production-ready AI
              infrastructure:
              authentication, analytics,
              API management,
              monetization, onboarding
              and growth systems in one
              platform.
            </p>

            <div className="hero-actions">

              <Link
                href="/login"
                className="primary-btn"
              >
                Start Free
              </Link>

              <Link
                href="/docs"
                className="secondary-btn"
              >
                View Docs
<VerifyBox />
              </Link>

            </div>

            <div className="metrics">

              <div className="metric">
                <strong>1M+</strong>
                <span>API Requests</span>
              </div>

              <div className="metric">
                <strong>99.9%</strong>
                <span>Uptime</span>
              </div>

              <div className="metric">
                <strong>45ms</strong>
                <span>Latency</span>
              </div>

            </div>

          </div>

          <div className="glass verify-card">

            <label>Email</label>

            <input
              readOnly
              value="Login required"
            />

            <label>Payload</label>

            <textarea
              readOnly
              value={`{
  "id":"evt_123456789",
  "type":"charge.succeeded"
}`}
            />

            <label>API Key</label>

            <input
              readOnly
              value="Generated after login"
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

        </div>

      </section>

      <section className="pricing">

        <div className="container">

          <h2 className="section-title">
            Transparent Pricing
          </h2>

          <div className="pricing-grid">

            <div className="glass price-card">

              <h3>Starter</h3>

              <p>50 / month</p>

              <strong>$0</strong>

              <button className="secondary-btn">
                Get Started
              </button>

            </div>

            <div className="glass price-card featured">

              <div className="popular">
                MOST POPULAR
              </div>

              <h3>Pro</h3>

              <p>1,000 / month</p>

              <strong>€6</strong>

              <a
                className="primary-btn"
                href={
                  process.env
                    .NEXT_PUBLIC_LEMON_CHECKOUT_PRO
                }
              >
                Get Started
              </a>

            </div>

            <div className="glass price-card">

              <h3>Enterprise</h3>

              <p>10,000 / month</p>

              <strong>€18</strong>

              <a
                className="secondary-btn"
                href={
                  process.env
                    .NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE
                }
              >
                Get Started
              </a>

            </div>

            <div className="glass price-card">

              <h3>Scale</h3>

              <p>100,000 / month</p>

              <strong>€49</strong>

              <a
                className="secondary-btn"
                href={
                  process.env
                    .NEXT_PUBLIC_LEMON_CHECKOUT_SCALE
                }
              >
                Get Started
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
