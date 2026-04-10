'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabase } from '@/lib/supabase-browser';
import { getCheckoutLink } from '@/lib/checkout';

type DashboardStats = {
  verifications: number;
  successRate: number;
  plan: string;
  apiKey: string;
  remaining: number;
  limit: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    verifications: 0,
    successRate: 99.1,
    plan: 'Free',
    apiKey: '',
    remaining: 50,
    limit: 50
  });

  const [email, setEmail] = useState('Loading...');
  const [activity, setActivity] = useState<Array<{ action: string; time: string; ok: boolean }>>([
    { action: 'Workspace initialized', time: 'just now', ok: true }
  ]);
  const [loading, setLoading] = useState(false);

  const CHECKOUT_PRO = getCheckoutLink('pro');

  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createBrowserSupabase();
        const { data: userData } = await supabase.auth.getUser();
        const userEmail = userData.user?.email || 'Welcome back';
        setEmail(userEmail);

        let key = localStorage.getItem('ovwi_api_key') || '';

        if (!key) {
          const res = await fetch('/api/create-key', { method: 'POST' });
          const data = await res.json();
          if (data.ok && data.apiKey) {
            key = data.apiKey;
            localStorage.setItem('ovwi_api_key', key);
          }
        }

        setStats((prev) => ({
          ...prev,
          apiKey: key
        }));
      } catch {
        setEmail('Welcome back');
      }
    };

    init();
  }, []);

  const runVerification = async () => {
    if (!stats.apiKey) return;
    setLoading(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: stats.apiKey })
      });

      const data = await res.json();

      const usage = Number(data.usage || 0);
      const limit = Number(data.limit || 50);
      const remaining = Number(data.remaining || Math.max(limit - usage, 0));
      const plan = data.plan || 'Free';

      setStats((prev) => ({
        ...prev,
        verifications: usage,
        plan,
        limit,
        remaining
      }));

      setActivity((prev) => [
        {
          action: data.upgrade ? 'Plan limit reached' : 'Verification executed',
          time: 'just now',
          ok: !data.upgrade
        },
        ...prev.slice(0, 4)
      ]);

      if (data.upgrade) {
        setTimeout(() => {
          window.location.href = CHECKOUT_PRO;
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = async () => {
    if (!stats.apiKey) return;
    await navigator.clipboard.writeText(stats.apiKey);
    setActivity((prev) => [
      { action: 'API key copied', time: 'just now', ok: true },
      ...prev.slice(0, 4)
    ]);
  };

  const handleLogout = async () => {
    try {
      const supabase = createBrowserSupabase();
      await supabase.auth.signOut();
    } catch {}
    window.location.href = '/';
  };

  const usagePercent = stats.limit > 0 ? Math.min((stats.verifications / stats.limit) * 100, 100) : 0;

  return (
    <div className="page-shell dashboard-shell">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-subtitle">{email}</div>
        </div>
        <div className="helper-row">
          <a href="/docs"><button className="btn btn-secondary">Docs</button></a>
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Verifications This Month</div>
          <div className="stat-value stat-blue">{stats.verifications.toLocaleString()}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Success Rate</div>
          <div className="stat-value stat-green">{stats.successRate}%</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Current Plan</div>
          <div className="stat-value stat-yellow">{stats.plan}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card panel">
          <h2 className="panel-title">API Key</h2>
          <p className="panel-copy">Use this key to verify requests and track usage.</p>

          <div className="api-row">
            <input className="input-mono" type="text" value={stats.apiKey} readOnly />
            <button className="btn btn-primary" onClick={copyApiKey}>Copy</button>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9eb3d2', fontSize: 13, marginBottom: 8 }}>
              <span>Usage</span>
              <span>{stats.verifications} / {stats.limit}</span>
            </div>
            <div className="progress-wrap">
              <div
                className={`progress-bar ${usagePercent >= 100 ? 'progress-danger' : usagePercent >= 80 ? 'progress-warn' : 'progress-normal'}`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>

          <div className="helper-row" style={{ marginTop: 18 }}>
            <button className="btn btn-primary" onClick={runVerification} disabled={loading}>
              {loading ? 'Running...' : 'Run Verification'}
            </button>
            <a href={CHECKOUT_PRO}><button className="btn btn-secondary">Upgrade</button></a>
          </div>
        </div>

        <div className="card panel">
          <h2 className="panel-title">Recent Activity</h2>
          <div className="activity-list">
            {activity.map((item, i) => (
              <div key={i} className="activity-item">
                <div>
                  <div className="activity-main">{item.action}</div>
                  <div className="activity-time">{item.time}</div>
                </div>
                <div className="activity-ok">{item.ok ? '✓' : '!'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
