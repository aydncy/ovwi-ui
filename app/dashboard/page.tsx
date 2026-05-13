'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';

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
    successRate: 99.9,
    plan: 'Free',
    apiKey: '',
    remaining: 50,
    limit: 50
  });

  const [email, setEmail] = useState('Loading...');
  const [loading, setLoading] = useState(false);

  const [activity, setActivity] = useState<
    Array<{ action: string; time: string; ok: boolean }>
  >([
    {
      action: 'Dashboard initialized',
      time: 'just now',
      ok: true
    }
  ]);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (!data.user) {
          window.location.href = '/auth/login';
          return;
        }

        setEmail(data.user.email || 'Welcome back');

        let storedKey = localStorage.getItem('ovwi_api_key') || '';

        if (!storedKey) {
          const res = await fetch('/api/create-key', {
            method: 'POST'
          });

          const json = await res.json();

          if (json.ok && json.apiKey) {
            storedKey = json.apiKey;
            localStorage.setItem('ovwi_api_key', storedKey);
          }
        }

        setStats((prev) => ({
          ...prev,
          apiKey: storedKey
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

      setActivity((prev) => [
        {
          action: data.upgrade
            ? 'Monthly limit reached'
            : 'Webhook verification successful',
          time: 'just now',
          ok: !data.upgrade
        },
        ...prev.slice(0, 5)
      ]);

      if (data.upgrade) {
        setTimeout(() => {
          window.location.href = CHECKOUTS.pro;
        }, 1200);
      }
    } catch {
      setActivity((prev) => [
        {
          action: 'Verification failed',
          time: 'just now',
          ok: false
        },
        ...prev.slice(0, 5)
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyKey = async () => {
    if (!stats.apiKey) return;

    await navigator.clipboard.writeText(stats.apiKey);

    setActivity((prev) => [
      {
        action: 'API key copied',
        time: 'just now',
        ok: true
      },
      ...prev.slice(0, 5)
    ]);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('ovwi_api_key');
    window.location.href = '/';
  };

  const usagePercent =
    stats.limit > 0
      ? Math.min((stats.verifications / stats.limit) * 100, 100)
      : 0;

  return (
    <div className="page-shell">
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">
            OVWI
          </a>

          <div className="nav-links">
            <a href="/docs">
              <button className="btn btn-secondary btn-small">
                Docs
              </button>
            </a>

            <button
              className="btn btn-primary btn-small"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-shell">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Verification Dashboard
            </h1>

            <div className="dashboard-subtitle">
              {email}
            </div>
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
              Success Rate
            </div>

            <div className="stat-value stat-green">
              {stats.successRate}%
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-label">
              Remaining Requests
            </div>

            <div className="stat-value stat-yellow">
              {stats.remaining}
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card panel">
            <h2 className="panel-title">
              API Verification
            </h2>

            <p className="panel-copy">
              Run a real webhook verification request
              against your OVWI API infrastructure.
            </p>

            <div className="field">
              <label className="label">
                Your API Key
              </label>

              <div className="api-row">
                <input
                  className="input-mono"
                  value={stats.apiKey}
                  readOnly
                />

                <button
                  className="btn btn-secondary"
                  onClick={copyKey}
                >
                  Copy
                </button>
              </div>
            </div>

            <div
              style={{
                marginTop: 22
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  color: '#9eb3d2',
                  fontSize: 13
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
            </div>

            <div
              className="helper-row"
              style={{
                marginTop: 22
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

              <a href={CHECKOUTS.pro}>
                <button className="btn btn-secondary">
                  Upgrade Plan
                </button>
              </a>
            </div>
          </div>

          <div className="card panel">
            <h2 className="panel-title">
              Live Verification Feed
            </h2>

            <p className="panel-copy">
              Real-time activity from your workspace.
            </p>

            <div className="activity-list">
              {activity.map((item, index) => (
                <div
                  className="activity-item"
                  key={index}
                >
                  <div>
                    <div className="activity-main">
                      {item.action}
                    </div>

                    <div className="activity-time">
                      {item.time}
                    </div>
                  </div>

                  <div
                    className="activity-ok"
                    style={{
                      color: item.ok
                        ? '#10b981'
                        : '#ff5d73'
                    }}
                  >
                    {item.ok ? 'SUCCESS' : 'ERROR'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card panel">
            <h2 className="panel-title">
              Current Plan
            </h2>

            <p className="panel-copy">
              Your workspace currently runs on the{' '}
              <strong>{stats.plan}</strong> plan.
            </p>

            <div
              style={{
                display: 'grid',
                gap: 14,
                marginTop: 18
              }}
            >
              <div className="result-box result-ok">
                <div className="result-title ok">
                  Included Requests
                </div>

                <div>
                  {stats.limit.toLocaleString()} monthly
                  webhook verifications included.
                </div>
              </div>

              <div className="result-box result-warn">
                <div className="result-title warn">
                  Scale Instantly
                </div>

                <div>
                  Upgrade anytime for higher request
                  limits and production scaling.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}