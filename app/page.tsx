'use client';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { CHECKOUTS } from '@/lib/checkout';
import { supabase } from '@/lib/supabase-browser';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase!.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
  }, []);

  const verify = async () => {
    if(!email) {
      alert("Please enter an email address");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, event: 'charge.succeeded', amount: 499 })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ ok: false, error: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  const secureCheckout = (url: string) => {
    if (!loggedIn) { window.location.href = '/auth/login'; return; }
    window.location.href = url;
  };

  return (
    <>
      <Navbar />
      <section className="hero">
        <div>
          <h1>Build.<br/>Scale.<br/><span>Monetize.</span></h1>
          <p>Production-ready AI infrastructure with verification, API management, analytics, and monetization.</p>
          <div className="hero-actions">
            <a href="/auth/signup"><button className="nav-btn primary-btn">Start Free</button></a>
            <a href="/docs"><button className="nav-btn">View Docs</button></a>
          </div>
        </div>
        <div className="hero-card">
          <label className="label">Email (User ID)</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          
          <label className="label">Webhook Payload Simulation</label>
          <textarea className="textarea" readOnly defaultValue={`{
  "event": "charge.succeeded",
  "amount": 499,
  "user": "${email || '...'}"
}`} />
          
          <button onClick={verify} className="verify-btn">
            {loading ? 'Verifying...' : 'Verify Webhook & Increment Usage'}
          </button>
          
          {result && (
            <div className="result" style={{borderColor: result.ok ? '#2ee4ff' : '#ff4d4d'}}>
              <div style={{marginBottom:10, fontWeight:'bold', color: result.ok ? '#2ee4ff' : '#ff4d4d'}}>
                {result.ok ? '✓ Success' : '✗ Failed'}
              </div>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </section>
      
      {/* Pricing Section (Kısaltılmış hali) */}
      <section className="section">
        <h2 className="section-title">Pricing</h2>
        <div className="pricing">
          <div className="price-card"><h3>Starter</h3><div className="price">Free</div><p>50 req/mo</p><br/><a href="/auth/signup"><button className="verify-btn">Start Free</button></a></div>
          <div className="price-card popular"><div className="badge">POPULAR</div><h3>Pro</h3><div className="price">€6<small>/mo</small></div><p>1k req/mo</p><br/><button onClick={() => secureCheckout(CHECKOUTS.pro)} className="verify-btn">Upgrade</button></div>
          <div className="price-card"><h3>Enterprise</h3><div className="price">€18<small>/mo</small></div><p>10k req/mo</p><br/><button onClick={() => secureCheckout(CHECKOUTS.enterprise)} className="verify-btn">Upgrade</button></div>
          <div className="price-card"><h3>Scale</h3><div className="price">€49<small>/mo</small></div><p>100k req/mo</p><br/><button onClick={() => secureCheckout(CHECKOUTS.scale)} className="verify-btn">Upgrade</button></div>
        </div>
      </section>
      <div className="footer">2026 OVWI Infrastructure Platform</div>
    </>
  );
}
