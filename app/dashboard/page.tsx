'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [usage, setUsage] = useState(12);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { window.location.href = '/auth/login'; return; }
      setEmail(data.user.email || '');
    });
  }, []);

  const runVerify = async () => {
    const res = await fetch('/api/verify', { method: 'POST' });
    const data = await res.json();
    setUsage(data.usage);
    setLimit(data.limit);
  };

  const percent = Math.min((usage / limit) * 100, 100);

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-top">
          <div><h1>Dashboard</h1><p style={{color:'#8da6cf'}}>{email}</p></div>
          <button onClick={runVerify} className="verify-btn" style={{width:220}}>Run Verification</button>
        </div>
        <div className="stats">
          <div className="stat"><span>Requests</span><strong>{usage}</strong></div>
          <div className="stat"><span>Remaining</span><strong>{limit - usage}</strong></div>
          <div className="stat"><span>Plan</span><strong>Free</strong></div>
        </div>
        <div className="panel">
          <h2>Usage</h2>
          <div className="progress"><div style={{ width: `${percent}%` }} /></div>
          <p style={{marginTop:18,color:'#8da6cf'}}>{usage} / {limit} requests used</p>
        </div>
        <div className="panel">
          <h2>Upgrade</h2>
          <div className="pricing">
            <div className="price-card"><h3>Pro</h3><div className="price">€6</div><button onClick={() => window.location.href = CHECKOUTS.pro} className="verify-btn">Buy Pro</button></div>
            <div className="price-card"><h3>Ent</h3><div className="price">€18</div><button onClick={() => window.location.href = CHECKOUTS.enterprise} className="verify-btn">Buy Ent</button></div>
            <div className="price-card"><h3>Scale</h3><div className="price">€49</div><button onClick={() => window.location.href = CHECKOUTS.scale} className="verify-btn">Buy Scale</button></div>
          </div>
        </div>
      </div>
    </>
  );
}
