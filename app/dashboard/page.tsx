'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  // Veriyi Redis'ten çeken fonksiyon
  const fetchData = async () => {
    if (!email) return;
    try {
      const res = await fetch(`/api/verify?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setUsage(data.usage);
      setLimit(data.limit);
    } catch (e) {
      console.error("Fetch error", e);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { 
        window.location.href = '/auth/login'; 
        return; 
      }
      const userEmail = data.user.email || '';
      setEmail(userEmail);
      
      // Email belli olduktan sonra veriyi çek
      if(userEmail) {
        // Küçük bir gecikme ile fetch et (state oturması için)
        setTimeout(() => fetchData(), 100);
      }
    });
  }, []);

  const runVerify = async () => {
    setLoading(true);
    try {
      // Backend'e POST atarak sayacı artır
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (data.ok) {
        setUsage(data.usage);
        setLimit(data.limit);
        alert(`✓ Verified Successfully!\nRemaining: ${data.remaining}`);
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (e) {
      alert("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const percent = Math.min((usage / limit) * 100, 100);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-top">
          <div>
            <h1>Dashboard</h1>
            <p style={{color:'#8da6cf',marginTop:12}}>{email || 'Loading...'}</p>
          </div>
          <button 
            onClick={runVerify} 
            className="verify-btn" 
            style={{width:220, opacity: loading ? 0.7 : 1}}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Run Verification'}
          </button>
        </div>

        <div className="stats">
          <div className="stat">
            <span>Requests Used</span>
            <strong>{usage}</strong>
          </div>
          <div className="stat">
            <span>Remaining</span>
            <strong style={{color: limit - usage < 10 ? '#ff4d4d' : '#fff'}}>{limit - usage}</strong>
          </div>
          <div className="stat">
            <span>Plan Limit</span>
            <strong>{limit}</strong>
          </div>
        </div>

        <div className="panel">
          <h2 style={{marginBottom:20}}>Usage Progress</h2>
          <div className="progress">
            <div style={{width: `${percent}%`, background: percent > 90 ? '#ff4d4d' : 'linear-gradient(90deg,#327bff,#18d6ff)'}} />
          </div>
          <p style={{marginTop:18,color:'#8da6cf'}}>
            {usage} / {limit} requests used
          </p>
        </div>

        <div className="panel">
          <h2 style={{marginBottom:24}}>Upgrade Plan</h2>
          <div className="pricing">
            <div className="price-card">
              <h3>Pro</h3>
              <div className="price">€6</div>
              <button onClick={() => window.location.href = CHECKOUTS.pro} className="verify-btn">Buy Pro</button>
            </div>
            <div className="price-card">
              <h3>Ent</h3>
              <div className="price">€18</div>
              <button onClick={() => window.location.href = CHECKOUTS.enterprise} className="verify-btn">Buy Ent</button>
            </div>
            <div className="price-card">
              <h3>Scale</h3>
              <div className="price">€49</div>
              <button onClick={() => window.location.href = CHECKOUTS.scale} className="verify-btn">Buy Scale</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
