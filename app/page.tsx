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
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      if (data.session?.user?.email) setEmail(data.session.user.email);
    });
  }, []);

  const verify = async () => {
    if (!email) {
      alert("Please login first to track usage.");
      window.location.href = '/auth/login';
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setResult(data);
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
          <label className="label">Logged in as</label>
          <input className="input" value={email} readOnly placeholder="Not logged in" style={{opacity:0.7}} />
          
          <label className="label" style={{marginTop:15}}>Simulated Webhook Payload</label>
          <textarea className="textarea" readOnly defaultValue={`{
  "event": "charge.succeeded",
  "amount": 499,
  "currency": "EUR"
}`} />

          <button onClick={verify} className="verify-btn">
            {loading ? 'Processing...' : 'Run Verification & Increment'}
          </button>

          {result && (
            <div className="result">
              <div style={{marginBottom:10, color:'#4ade80', fontWeight:'bold'}}>
                ✓ Verified Successfully
              </div>
              <pre style={{fontSize:12}}>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </section>
      
      {/* Pricing Section (Aynı kaldı) */}
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
