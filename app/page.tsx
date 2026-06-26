'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { CHECKOUTS } from '@/lib/checkout';
import { supabase } from '@/lib/supabase-browser';

export default function Home() {

  const [loggedIn,setLoggedIn] = useState(false);
  const [email,setEmail] = useState('');
  const [payload,setPayload] = useState('{\n  "id":"evt_123456789",\n  "type":"charge.succeeded"\n}');
  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      setLoggedIn(!!data.session);
    });
  },[]);

  const verify = async () => {
    setLoading(true);

    try{
      const res = await fetch('/api/verify',{
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify({ email })
      });

      const data = await res.json();
      setResult(data);

    } finally{
      setLoading(false);
    }
  };

  const secureCheckout = (url:string) => {
    if(!loggedIn){
      window.location.href='/auth/login';
      return;
    }
    window.location.href=url;
  };

  return (
    <>
      <Navbar />

      {/* ✅ HERO SPLIT */}
      <section className="hero">

        {/* LEFT */}
        <div>
          <div className="label">Now available</div>

          <h1>
            Stop debugging.
            <br />
            Start <span>verifying.</span>
          </h1>

          <p>
            Verify webhooks instantly with real-time feedback, live usage tracking,
            and upgrade paths built in from day one.
          </p>

          <div className="hero-actions">
            <a href="/auth/signup">
              <button className="primary-btn nav-btn">
                Get Started
              </button>
            </a>

            <a href="/docs">
              <button className="nav-btn">
                View Docs
              </button>
            </a>
          </div>

          <div style={{marginTop:30, display:'flex', gap:30}}>
            <div>
              <strong>1M+</strong>
              <p className="label">Verifications</p>
            </div>

            <div>
              <strong>99.9%</strong>
              <p className="label">Success Rate</p>
            </div>

            <div>
              <strong>45ms</strong>
              <p className="label">Latency</p>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="hero-card">

          <label className="label">Email</label>
          <input
            className="input"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder="Login required"
          />

          <label className="label">Payload</label>
          <textarea
            className="textarea"
            value={payload}
            onChange={e=>setPayload(e.target.value)}
          />

          <label className="label">API Key</label>
          <input
            className="input"
            disabled
            placeholder="Generated after login"
          />

          <div className="hero-actions">
            <button onClick={verify} className="verify-btn">
              {loading ? 'Verifying...' : 'Verify Webhook'}
            </button>

            <button
              onClick={()=>setResult(null)}
              className="nav-btn"
              style={{flex:1}}
            >
              Reset
            </button>
          </div>

          {result && (
            <div className="result">
              {JSON.stringify(result,null,2)}
            </div>
          )}

        </div>

      </section>

      {/* ✅ FEATURES */}
      <section className="section">

        <h2 className="section-title">Infrastructure Features</h2>

        <div className="features">

          <div className="feature">
            <h3>Authentication</h3>
            <p>Secure login system with Supabase auth and session handling.</p>
          </div>

          <div className="feature">
            <h3>Analytics</h3>
            <p>Real-time usage tracking, limits and request insights.</p>
          </div>

          <div className="feature">
            <h3>Monetization</h3>
            <p>Built-in upgrade flow with Lemon Squeezy checkout.</p>
          </div>

        </div>

      </section>

      {/* ✅ PRICING */}
      <section className="section">

        <h2 className="section-title">Simple Pricing</h2>

        <div className="pricing">

          <div className="price-card">
            <h3>Starter</h3>
            <p>50 requests / month</p>
            <div className="price">$0</div>
            <a href="/auth/signup"><button class="nav-btn">Get Started</button>
            </a>
          </div>

          <div className="price-card popular">
            <div className="badge">Most Popular</div>
            <h3>Pro</h3>
            <p>1,000 requests / month</p>
            <div className="price">€6</div>
            <button onClick={()=>secureCheckout(CHECKOUTS.pro)} className="verify-btn">
              Upgrade
            </button>
          </div>

          <div className="price-card">
            <h3>Enterprise</h3>
            <p>10,000 / month</p>
            <div className="price">€18</div>
            <button onClick={()=>secureCheckout(CHECKOUTS.enterprise)} className="verify-btn">
              Upgrade
            </button>
          </div>

          <div className="price-card">
            <h3>Scale</h3>
            <p>100,000 / month</p>
            <div className="price">€49</div>
            <button onClick={()=>secureCheckout(CHECKOUTS.scale)} className="verify-btn">
              Upgrade
            </button>
          </div>

        </div>

      </section>

      <footer className="footer">
        2026 OVWI Infrastructure Platform
      </footer>

    </>
  );
}
