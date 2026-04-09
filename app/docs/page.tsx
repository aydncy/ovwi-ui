'use client';

import { useEffect, useMemo, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';
import { getCheckoutLink } from '@/lib/checkout';

export default function DocsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const userEmail = data.user?.email || null;
      setEmail(userEmail);

      if (userEmail) {
        let key = localStorage.getItem('ovwi_api_key') || '';

        if (!key) {
          const res = await fetch('/api/create-key', { method: 'POST' });
          const d = await res.json();
          key = d.apiKey;
          localStorage.setItem('ovwi_api_key', key);
        }

        setApiKey(key);

        const dash = await fetch(`/api/dashboard?email=${encodeURIComponent(userEmail)}`);
        const dashData = await dash.json();
        setResult(dashData);
      }
    };

    init();
  }, []);

  const CHECKOUT_PRO = getCheckoutLink('pro', apiKey);

  const curlCommand = useMemo(() => {
    return `curl -X POST https://ovwi.cyzora.com/api/verify \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey":"${apiKey}","email":"${email || ''}"}'`;
  }, [apiKey, email]);

  const copy = async (text: string, type: 'key' | 'curl') => {
    await navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 1400);
    } else {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 1400);
    }
  };

  const runVerify = async () => {
    if (!apiKey || !email) {
      window.location.href = '/auth/login';
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, email })
      });

      const data = await res.json();
      setResult(data);

      if (data.upgrade) {
        window.location.href = CHECKOUT_PRO;
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = '/';
  };

  const percent = result?.limit ? Math.min(Math.round((result.usage / result.limit) * 100), 100) : 0;

  return (
    <div className="page-shell docs-shell">
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">OVWI</a>
          <div className="nav-links">
            <a href="/"><button className="btn btn-secondary btn-small">Home</button></a>
            {email ? (
              <>
                <a href="/dashboard"><button className="btn btn-secondary btn-small">Dashboard</button></a>
                <button className="btn btn-primary btn-small" onClick={logout}>Logout</button>
              </>
            ) : (
              <a href="/auth/login"><button className="btn btn-primary btn-small">Login</button></a>
            )}
          </div>
        </div>
      </nav>

      <section className="docs-hero-ultimate">
        <div className="docs-left">
          <div className="hero-badge docs-badge">Developer Platform</div>

          <h1 className="docs-title-ultimate">
            Ship webhook verification with
            <span className="docs-gradient"> usage tracking, limits, and upgrades</span>
          </h1>

          <p className="docs-copy-ultimate">
            OVWI gives you a production-ready verify endpoint, plan-aware request limits,
            and a built-in upgrade flow. Test it live, copy the request, and plug it into your product.
          </p>

          <div className="docs-pills">
            <div className="pill">POST /api/create-key</div>
            <div className="pill">POST /api/verify</div>
            <div className="pill">Magic Link Auth</div>
            <div className="pill">Limit-aware Billing</div>
          </div>

          <div className="docs-actions">
            <button className="btn btn-primary" onClick={runVerify} disabled={loading}>
              {loading ? 'Running...' : 'Run Live Verify'}
            </button>
            {email ? (
              <a href="/dashboard"><button className="btn btn-secondary">Open Dashboard</button></a>
            ) : (
              <a href="/auth/login"><button className="btn btn-secondary">Login</button></a>
            )}
            <button className="btn btn-secondary" onClick={() => {
              if (!email) {
                window.location.href = '/auth/login';
                return;
              }
              window.location.href = CHECKOUT_PRO;
            }}>
              Upgrade
            </button>
          </div>

          <div className="docs-stats-grid">
            <div className="docs-mini-card">
              <div className="docs-mini-label">Current user</div>
              <div className="docs-mini-value">{email || 'Login required'}</div>
            </div>
            <div className="docs-mini-card">
              <div className="docs-mini-label">Provisioned key</div>
              <div className="docs-mini-value mono-ellipsize">{apiKey || 'Login required'}</div>
            </div>
          </div>
        </div>

        <div className="docs-right">
          <div className="card docs-live-card">
            <div className="docs-card-top">
              <div>
                <div className="docs-card-label">Live Request</div>
                <div className="docs-card-title">Try the real endpoint</div>
              </div>
              <div className="docs-dot-wrap">
                <span className="docs-dot"></span>
                <span className="docs-dot"></span>
                <span className="docs-dot"></span>
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <input className="input" value={email || ''} readOnly placeholder="Login required" />
            </div>

            <div className="field">
              <label className="label">API Key</label>
              <div className="copy-row">
                <input className="input-mono" value={apiKey} readOnly placeholder="Generated after login" />
                <button className="btn btn-secondary btn-small" onClick={() => copy(apiKey, 'key')} disabled={!apiKey}>
                  {copiedKey ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="field">
              <label className="label">cURL</label>
              <div className="docs-code-card">
                <pre className="code-block">{curlCommand}</pre>
              </div>
              <div style={{ marginTop: 10 }}>
                <button className="btn btn-secondary btn-small" onClick={() => copy(curlCommand, 'curl')} disabled={!apiKey || !email}>
                  {copiedCurl ? 'Copied' : 'Copy cURL'}
                </button>
              </div>
            </div>

            <div className="docs-live-actions">
              <button className="btn btn-primary" onClick={runVerify} disabled={loading}>
                {loading ? 'Running...' : 'Verify Request'}
              </button>
              <a href="/"><button className="btn btn-secondary">Back Home</button></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section docs-grid-section">
        <div className="docs-grid-ultimate">
          <div className="card docs-panel">
            <div className="docs-panel-title">Request Shape</div>
            <div className="docs-panel-copy">Send your API key together with the authenticated email.</div>
            <pre className="code-block">{`{
  "apiKey": "${apiKey}",
  "email": "${email || ''}"
}`}</pre>
          </div>

          <div className="card docs-panel">
            <div className="docs-panel-title">Response Shape</div>
            <div className="docs-panel-copy">Successful verification returns plan-aware limits and remaining quota.</div>
            <pre className="code-block">{result ? JSON.stringify(result, null, 2) : `{
  "ok": true,
  "plan": "pro",
  "usage": 0,
  "limit": 1000,
  "remaining": 1000
}`}</pre>
          </div>

          <div className="card docs-panel docs-visual-panel">
            <div className="docs-panel-title">Usage Progress</div>
            <div className="docs-panel-copy">Visualize how close the current key is to the plan limit.</div>

            <div className="docs-meter-shell">
              <div className="docs-meter-bar">
                <div
                  className={`docs-meter-fill ${percent >= 100 ? 'danger' : percent >= 80 ? 'warn' : 'normal'}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="docs-meter-meta">
                <span>{result?.usage || 0} used</span>
                <span>{result?.limit || 0} max</span>
              </div>
            </div>

            <div className="docs-orbit">
              <div className="docs-orbit-ring ring-1"></div>
              <div className="docs-orbit-ring ring-2"></div>
              <div className="docs-orbit-core">
                <div className="docs-orbit-value">{percent}%</div>
                <div className="docs-orbit-label">capacity</div>
              </div>
            </div>
          </div>

          <div className="card docs-panel">
            <div className="docs-panel-title">How It Works</div>
            <div className="docs-steps">
              <div className="docs-step">
                <div className="docs-step-no">1</div>
                <div>
                  <div className="docs-step-title">Authenticate</div>
                  <div className="docs-step-copy">User signs in via magic link and receives a bound session.</div>
                </div>
              </div>
              <div className="docs-step">
                <div className="docs-step-no">2</div>
                <div>
                  <div className="docs-step-title">Create Key</div>
                  <div className="docs-step-copy">OVWI provisions a key and stores it for the logged-in user.</div>
                </div>
              </div>
              <div className="docs-step">
                <div className="docs-step-no">3</div>
                <div>
                  <div className="docs-step-title">Verify</div>
                  <div className="docs-step-copy">The endpoint increments usage, enforces limits, and returns plan-aware metadata.</div>
                </div>
              </div>
              <div className="docs-step">
                <div className="docs-step-no">4</div>
                <div>
                  <div className="docs-step-title">Upgrade</div>
                  <div className="docs-step-copy">When the key reaches its limit, the user is redirected to the correct checkout.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card docs-panel docs-cta-panel">
            <div className="docs-panel-title">Ready to scale?</div>
            <div className="docs-panel-copy">
              Move beyond the starter limit and unlock a higher verification quota for your production traffic.
            </div>
            <div className="docs-cta-actions">
              <button className="btn btn-primary" onClick={() => {
                if (!email) {
                  window.location.href = '/auth/login';
                  return;
                }
                window.location.href = CHECKOUT_PRO;
              }}>
                Upgrade to Pro
              </button>
              {email ? (
                <a href="/dashboard"><button className="btn btn-secondary">Open Dashboard</button></a>
              ) : (
                <a href="/auth/login"><button className="btn btn-secondary">Login</button></a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
