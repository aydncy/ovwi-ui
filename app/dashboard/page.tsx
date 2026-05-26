'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { CHECKOUTS } from '@/lib/checkout';
import { supabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(true);

  // Verileri çekme fonksiyonu
  const fetchStats = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        window.location.href = '/auth/login';
        return;
      }

      const userEmail = user.data.user.email || 'anonymous';
      setEmail(userEmail);

      // API'den güncel durumu çek (Bu işlem sayacı 1 artırır, ilk giriş için kabul ediyoruz)
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }) 
      });
      
      const data = await res.json();
      setUsage(data.usage);
      setLimit(data.limit);
    } catch (e) {
      console.error("Dashboard load error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const runVerify = async () => {
    if (!email) return;
    
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (data.ok) {
        setUsage(data.usage);
        setLimit(data.limit);
        alert("✓ Verification Successful!");
      } else {
        alert("⚠ Limit Exceeded or Error: " + (data.message || data.error));
      }
    } catch (e) {
      alert("Connection error");
    }
  };

  const remaining = limit - usage;
  const percent = Math.min((usage / limit) * 100, 100);

  if (loading) return <div className="dashboard"><Navbar /><p>Loading...</p></div>;

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-top">
          <div>
            <h1>Dashboard</h1>
            <p style={{color:'#8da6cf'}}>{email}</p>
          </div>
          <button onClick={runVerify} className="verify-btn" style={{width:220}}>
            Run Verification (+1)
          </button>
        </div>
        
        <div className="stats">
          <div className="stat">
            <span>Requests Used</span>
            <strong>{usage}</strong>
          </div>
          <div className="stat">
            <span>Remaining</span>
            <strong style={{color: remaining < 10 ? '#ff4d4d' : '#fff'}}>{remaining}</strong>
          </div>
          <div className="stat">
            <span>Plan Limit</span>
            <strong>{limit}</strong>
          </div>
        </div>

        <div className="panel">
          <h2>Usage Overview</h2>
          <div className="progress">
            <div style={{ width: `${percent}%`, background: percent > 90 ? '#ff4d4d' : 'linear-gradient(90deg,#327bff,#18d6ff)' }} />
          </div>
          <p style={{marginTop:18,color:'#8da6cf'}}>
            {usage} / {limit} requests used ({Math.round(percent)}%)
          </p>
        </div>

        <div className="panel">
          <h2>Upgrade Plan</h2>
          <p style={{marginBottom:20, color:'#b7c7e5'}}>Increase your limits instantly.</p>
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
