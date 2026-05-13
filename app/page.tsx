'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { CHECKOUTS } from '@/lib/checkout';
import { supabase } from '@/lib/supabase-browser';

export default function Home() {

  const [loggedIn,setLoggedIn] = useState(false);

  const [email,setEmail] = useState('');
  const [result,setResult] = useState<any>(null);
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
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email
        })
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

      <section className="hero">

        <div>

          <h1>
            Build.<br/>
            Scale.<br/>
            <span>Monetize.</span>
          </h1>

          <p>
            Production-ready AI infrastructure with verification,
            API management, analytics, usage tracking,
            onboarding and monetization in one platform.
          </p>

          <div className="hero-actions">
            <a href="/auth/signup">
              <button className="nav-btn primary-btn">
                Start Free
              </button>
            </a>

            <a href="/docs">
              <button className="nav-btn">
                View Docs
              </button>
            </a>
          </div>

        </div>

        <div className="hero-card">

          <label className="label">
            Email
          </label>

          <input
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@company.com"
          />

          <label className="label">
            Webhook Payload
          </label>

          <textarea
            className="textarea"
            defaultValue={`{
  "event":"charge.succeeded",
  "amount":499
}`}
          />

          <button
            onClick={verify}
            className="verify-btn"
          >
            {loading ? 'Verifying...' : 'Verify Webhook'}
          </button>

          {result && (
            <div className="result">
<pre>{JSON.stringify(result,null,2)}</pre>
            </div>
          )}

        </div>

      </section>

      <section className="section">

        <h2 className="section-title">
          Infrastructure Features
        </h2>

        <div className="features">

          <div className="feature">
            <h3>Authentication</h3>
            <p>
              Secure session system with Supabase auth and production-grade login flows.
            </p>
          </div>

          <div className="feature">
            <h3>Analytics</h3>
            <p>
              Real-time usage counters, request analytics and limit tracking.
            </p>
          </div>

          <div className="feature">
            <h3>Monetization</h3>
            <p>
              Lemon Squeezy upgrade flows with plan management and webhook sync.
            </p>
          </div>

        </div>

      </section>

      <section className="section">

        <h2 className="section-title">
          Pricing
        </h2>

        <div className="pricing">

          <div className="price-card">
            <h3>Starter</h3>
            <div className="price">
              Free
            </div>

            <p>50 requests/month</p>

            <br/>

            <a href="/auth/signup">
              <button className="verify-btn">
                Start Free
              </button>
            </a>
          </div>

          <div className="price-card popular">

            <div className="badge">
              MOST POPULAR
            </div>

            <h3>Pro</h3>

            <div className="price">
              €6
              <small>/mo</small>
            </div>

            <p>1,000 requests/month</p>

            <br/>

            <button
              onClick={()=>secureCheckout(CHECKOUTS.pro)}
              className="verify-btn"
            >
              Upgrade
            </button>

          </div>

          <div className="price-card">
            <h3>Enterprise</h3>

            <div className="price">
              €18
              <small>/mo</small>
            </div>

            <p>10,000 requests/month</p>

            <br/>

            <button
              onClick={()=>secureCheckout(CHECKOUTS.enterprise)}
              className="verify-btn"
            >
              Upgrade
            </button>
          </div>

          <div className="price-card">
            <h3>Scale</h3>

            <div className="price">
              €49
              <small>/mo</small>
            </div>

            <p>100,000 requests/month</p>

            <br/>

            <button
              onClick={()=>secureCheckout(CHECKOUTS.scale)}
              className="verify-btn"
            >
              Upgrade
            </button>
          </div>

        </div>

      </section>

      <div className="footer">
        2026 OVWI Infrastructure Platform
      </div>
    </>
  );
}
