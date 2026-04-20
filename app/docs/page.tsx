import Nav from "../components/Nav";

export default function Docs() {
  return (
    <main className="container">
      <Nav />

      <section className="docs-hero">
        <div>
          <div className="kicker">Developer Docs</div>

          <h1 className="docs-title">
            Ship webhook verification with usage tracking, limits, and upgrades.
          </h1>

          <p className="docs-copy">
            OVWI gives you a clean request verification endpoint, request counting, and an upgrade path when the free plan runs out.
          </p>

          <div className="pill-row">
            <div className="pill">POST /api/create-key</div>
            <div className="pill">POST /api/verify</div>
            <div className="pill">Free 50 requests</div>
            <div className="pill">Upgrade-ready</div>
          </div>
        </div>

        <div className="docs-stack">
          <div className="card docs-card">
            <div className="label">Endpoints</div>
            <pre className="code">POST /api/create-key{"\n"}POST /api/verify</pre>
          </div>

          <div className="card docs-card">
            <div className="label">Request Shape</div>
            <pre className="code">{`{
  "apiKey": "...",
  "email": "..."
}`}</pre>
          </div>

          <div className="card docs-card">
            <div className="label">Response Shape</div>
            <pre className="code">{`{
  "ok": true,
  "plan": "pro",
  "limit": 1000,
  "remaining": 1000
}`}</pre>
          </div>

          <div className="card docs-card">
            <div className="label">Upgrade Path</div>
            <p className="panel-copy">Redirect users to checkout when the limit is reached and continue verifying on the next plan.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
