'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';
import { getCheckoutLink } from '@/lib/checkout';

export default function Home() {
  const [email, setEmail] = useState<string | null>(null);
  const [payload, setPayload] = useState('{\n  "id": "evt_1234567890",\n  "type": "charge.succeeded"\n}');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [usagePercent, setUsagePercent] = useState(0);
  const [apiKey, setApiKey] = useState('');
  const supabase = createBrowserSupabase();

  const syncState = async (userEmail: string, existingKey?: string) => {
    let key = existingKey || localStorage.getItem('ovwi_api_key') || '';

    if (!key) {
      const keyRes = await fetch('/api/create-key', { method: 'POST' });
      const keyData = await keyRes.json();

      if (keyData.ok && keyData.apiKey) {
        key = keyData.apiKey;
        localStorage.setItem('ovwi_api_key', key);
      }
    }

    setApiKey(key);

    const dashRes = await fetch(`/api/dashboard?email=${encodeURIComponent(userEmail)}`);
    const dashData = await dashRes.json();

    const usage = Number(dashData.usage || 0);
    const limit = Number(dashData.limit || 50);
    const percent = limit > 0 ? Math.min(Math.round((usage / limit) * 100), 100) : 0;

    setUsagePercent(percent);

    setResult({
      messageId: 'state_sync',
      latency: 0,
      provider: 'OVWI',
      plan: dashData.plan || 'free',
      usage,
      limit,
      remaining: Number(dashData.remaining || Math.max(limit - usage, 0)),
      apiKey: key,
      upgrade: false,
      warning: percent >= 80 && usage < limit,
      timestamp: new Date().toISOString()
    });

    return key;
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const userEmail = data.user?.email || null;
      setEmail(userEmail);

      if (userEmail) {
        await syncState(userEmail);
      } else {
        setResult(null);
        setApiKey('');
        setUsagePercent(0);
      }
    };

    init();
  }, []);

  const CHECKOUT_PRO = getCheckoutLink('pro', apiKey);
  const CHECKOUT_ENTERPRISE = getCheckoutLink('enterprise', apiKey);
  const CHECKOUT_SCALE = getCheckoutLink('scale', apiKey);

  const requireLogin = () => {
    if (!email) {
      window.location.href = '/auth/login';
      return true;
    }
    return false;
  };

  const handleVerify = async () => {
    if (requireLogin()) return;

    setLoading(true);
    try {
      const currentKey = await syncState(email!, apiKey);

      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: currentKey, email })
      });

      const data = await res.json();

      if (data.upgrade) {
        setShowUpgradeModal(true);
      }

      await syncState(email!, currentKey);
    } catch (e: any) {
      alert(e.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = '/';
  };

  const resetDemo = async () => {
    if (!email) {
      setResult(null);
      setUsagePercent(0);
      setShowUpgradeModal(false);
      return;
    }

    setShowUpgradeModal(false);
    await syncState(email, apiKey);
  };

  const goCheckout = (href: string) => {
    if (requireLogin()) return;
    window.location.href = href;
  };

  return (
    <div className="page-shell">
      {showUpgradeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.72)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(6px)'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '720px',
            padding: '36px',
            textAlign: 'center',
            border: '2px solid #3b82f6',
            boxShadow: '0 30px 80px rgba(59,130,246,0.28)'
          }}>
            <h2 style={{ fontSize: '34px', fontWeight: 950, margin: '0 0 12px' }}>Limit Reached</h2>
            <p style={{ color: '#cad8ee', lineHeight: 1.7, margin: '0 0 20px' }}>You used all available requests for the current plan. Upgrade now to keep verifying without interruption.</p>

            <div style={{
              marginBottom: '22px',
              padding: '14px',
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(121,180,255,0.14)',
              borderRadius: '12px',
              textAlign: 'left'
            }}>
              <div style={{ color: '#9cb1d2', fontSize: '12px', marginBottom: '6px' }}>Current usage</div>
              <div style={{ fontWeight: 800 }}>{result?.usage} / {result?.limit}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '22px' }}>
              {[
                { name: 'Pro', price: '€6', limit: '1,000 / month', best: true, href: CHECKOUT_PRO },
                { name: 'Enterprise', price: '€18', limit: '10,000 / month', best: false, href: CHECKOUT_ENTERPRISE },
                { name: 'Scale', price: '€49', limit: '100,000 / month', best: false, href: CHECKOUT_SCALE }
              ].map((plan) => (
                <div key={plan.name} className={`pricing-card ${plan.best ? 'popular' : ''}`} style={{ padding: '22px' }}>
                  {plan.best && <div className="pricing-badge">BEST VALUE</div>}
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-limit">{plan.limit}</div>
                  <div className="pricing-price" style={{ color: '#60a5fa', fontSize: '28px', marginBottom: '18px' }}>{plan.price}</div>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => goCheckout(plan.href)}>Upgrade Now</button>
                </div>
              ))}
            </div>

            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowUpgradeModal(false)}>Maybe Later</button>
          </div>
        </div>
      )}

      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">OVWI</a>
          <div className="nav-links">
            <a href="/docs"><button className="btn btn-secondary btn-small">Docs</button></a>
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

      <section className="hero">
        <div>
          <div className="hero-badge">Now available</div>
          <h1 className="hero-title">
            Stop debugging.<br />
            Start <span className="hero-highlight">verifying.</span>
          </h1>
          <p className="hero-copy">Verify webhooks instantly with real-time feedback, live usage tracking, and upgrade paths built in from day one.</p>

          <div className="hero-actions">
            {email ? (
              <a href="/dashboard"><button className="btn btn-primary">Open Dashboard</button></a>
            ) : (
              <a href="/auth/signup"><button className="btn btn-primary">Get Started</button></a>
            )}
            <a href="/docs"><button className="btn btn-secondary">View Docs</button></a>
          </div>

          <div className="hero-stats">
            {[{ label: 'Verifications', value: '1M+' }, { label: 'Success Rate', value: '99.9%' }, { label: 'Latency', value: '45ms' }].map((stat, i) => (
              <div key={i}>
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="demo" className="card demo-card">
          <div className="field">
            <label className="label">Email</label>
            <input className="input" type="email" value={email || ''} readOnly placeholder="Login required" />
          </div>

          <div className="field">
            <label className="label">Payload</label>
            <textarea className="textarea" value={payload} onChange={(e) => setPayload(e.target.value)} />
          </div>

          <div className="field">
            <label className="label">API Key</label>
            <input className="input-mono" type="text" value={apiKey} readOnly placeholder="Generated after login" />
          </div>

          <div className="demo-actions">
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleVerify} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Webhook'}
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={resetDemo}>Reset</button>
          </div>

          {result && (
            <div className={`result-box ${result.upgrade ? 'result-error' : result.warning ? 'result-warn' : 'result-ok'}`}>
              {usagePercent >= 80 && !result.upgrade && (
                <div className="inline-note warn">
                  Warning: {Math.max(100 - usagePercent, 0)}% remaining
                </div>
              )}

              {result.upgrade && (
                <div className="inline-note error">
                  Free plan exhausted. Upgrade required to continue.
                </div>
              )}

              <div className={`result-title ${result.upgrade ? 'error' : result.warning ? 'warn' : 'ok'}`}>
                {result.upgrade ? 'Limit Reached' : result.warning ? 'Verified with Warning' : 'Verified'}
              </div>

              <pre className="code-block">
{JSON.stringify(result, null, 2)}
              </pre>

              <div className="progress-wrap">
                <div
                  className={`progress-bar ${usagePercent >= 100 ? 'progress-danger' : usagePercent >= 80 ? 'progress-warn' : 'progress-normal'}`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="pricing" className="section">
        <h2 className="section-title">Simple Pricing</h2>
        <div className="pricing-grid">
          {[
            { name: 'Starter', price: '$0', limit: '50 / month', popular: false, href: '/auth/signup' },
            { name: 'Pro', price: '€6', limit: '1,000 / month', popular: true, href: CHECKOUT_PRO },
            { name: 'Enterprise', price: '€18', limit: '10,000 / month', popular: false, href: CHECKOUT_ENTERPRISE },
            { name: 'Scale', price: '€49', limit: '100,000 / month', popular: false, href: CHECKOUT_SCALE }
          ].map((plan, i) => (
            <div key={i} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="pricing-badge">MOST POPULAR</div>}
              <div className="pricing-name">{plan.name}</div>
              <div className="pricing-limit">{plan.limit}</div>
              <div className="pricing-price">{plan.price}</div>
              <button
                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%' }}
                onClick={() => {
                  if (plan.name === 'Starter') {
                    window.location.href = '/auth/signup';
                    return;
                  }
                  goCheckout(plan.href);
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p style={{ margin: 0 }}>2026 OVWI. Enterprise webhook verification.</p>
      </footer>
    </div>
  );
}
// deploy test
