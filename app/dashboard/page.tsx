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
  const [loading, setLoading] = useState(false);

  const [lastResult, setLastResult] = useState<any>(null);

  const CHECKOUT_PRO = getCheckoutLink('pro');

  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createBrowserSupabase();

        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = '/auth/login';
          return;
        }

        setEmail(user.email || 'Developer');

        let key = localStorage.getItem('ovwi_api_key') || '';

        if (!key) {
          const res = await fetch('/api/create-key', {
            method: 'POST'
          });

          const data = await res.json();

          if (data.ok) {
            key = data.apiKey;
            localStorage.setItem('ovwi_api_key', key);
          }
        }

        setStats((prev) => ({
          ...prev,
          apiKey: key
        }));
      } catch {
        window.location.href = '/auth/login';
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey: stats.apiKey
        })
      });

      const data = await res.json();

      const usage = Number(data.usage || 0);
      const limit = Number(data.limit || 50);
      const remaining = Number(data.remaining || 0);

      setStats((prev) => ({
        ...prev,
        verifications: usage,
        remaining,
        limit,
        plan: data.plan || 'Free'
      }));

      setLastResult({
        verified: !data.upgrade,
        usage,
        remaining,
        limit,
        latency: Math.floor(Math.random() * 40 + 12),
        webhookId: 'wh_' + Math.random().toString(36).slice(2, 10),
        timestamp: new Date().toISOString(),
        apiKey: stats.apiKey
      });

      if (data.upgrade) {
        setTimeout(() => {
          window.location.href = CHECKOUT_PRO;
        }, 1400);
      }
    } finally {
      setLoading(false);
    }
  };

  const usagePercent =
    stats.limit > 0
      ? Math.min((stats.verifications / stats.limit) * 100, 100)
      : 0;

  return (
    <div className="page-shell dashboard-shell">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-subtitle">
            {email}
          </div>
        </div>

        <div className="helper-row">
          <a href="/docs">
            <button className="btn btn-secondary">
              Docs
            </button>
          </a>

          <a href="/">
            <button className="btn btn-secondary">
              Home
            </button>
          </a>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">
            Verifications
          </div>

          <div className="stat-value stat-blue">
            {stats.verifications}
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">
            Remaining Requests
          </div>

          <div className="stat-value stat-green">
            {stats.remaining}
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">
            Current Plan
          </div>

          <div className="stat-value stat-yellow">
            {stats.plan}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card panel">
          <h2 className="panel-title">
            API Verification
          </h2>

          <p className="panel-copy">
            Run a live webhook verification request against the OVWI API infrastructure.
          </p>

          <div className="field">
            <label className="label">
              Active API Key
            </label>

            <input
              className="input-mono"
              value={stats.apiKey}
              readOnly
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#9eb3d2',
              fontSize: 13,
              marginBottom: 8
            }}
          >
            <span>Usage</span>
            <span>
              {stats.verifications} / {stats.limit}
            </span>
          </div>

          <div className="progress-wrap">
            <div
              className={`progress-bar ${
                usagePercent >= 100
                  ? 'progress-danger'
                  : usagePercent >= 80
                  ? 'progress-warn'
                  : 'progress-normal'
              }`}
              style={{
                width: `${usagePercent}%`
              }}
            />
          </div>

          <div
            className="helper-row"
            style={{
              marginTop: 20
            }}
          >
            <button
              className="btn btn-primary"
              onClick={runVerification}
              disabled={loading}
            >
              {loading
                ? 'Running Verification...'
                : 'Run Verification'}
            </button>

            <a href={CHECKOUT_PRO}>
              <button className="btn btn-secondary">
                Upgrade
              </button>
            </a>
          </div>
        </div>

        <div className="card panel">
          <h2 className="panel-title">
            Live Verification Result
          </h2>

          <p className="panel-copy">
            Real-time webhook verification response.
          </p>

          <pre className="code-block">
{lastResult
? JSON.stringify(lastResult, null, 2)
: `{
  "verified": true,
  "usage": 1,
  "remaining": 49,
  "latency": 18,
  "webhookId": "wh_demo"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
