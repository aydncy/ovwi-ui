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

type VerifyResponse = {
  messageId: string;
  latency: number;
  provider: string;
  plan: string;
  usage: number;
  limit: number;
  remaining: number;
  verified: boolean;
  endpoint: string;
  timestamp: string;
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

  const [activity, setActivity] = useState<
    Array<{ action: string; time: string; ok: boolean }>
  >([
    { action: 'Workspace initialized', time: 'just now', ok: true }
  ]);

  const [verifyResult, setVerifyResult] = useState<VerifyResponse | null>(null);

  const CHECKOUT_PRO = getCheckoutLink('pro');

  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createBrowserSupabase();

        const { data: userData } = await supabase.auth.getUser();

        if (!userData.user) {
          window.location.href = '/auth/login';
          return;
        }

        const userEmail = userData.user.email || 'Welcome back';
        setEmail(userEmail);

        let key = localStorage.getItem('ovwi_api_key') || '';

        if (!key) {
          const res = await fetch('/api/create-key', {
            method: 'POST'
          });

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
      const remaining = Number(data.remaining || limit - usage);

      setStats((prev) => ({
        ...prev,
        verifications: usage,
        remaining,
        limit,
        plan: data.plan || 'Free'
      }));

      const visualResult: VerifyResponse = {
        messageId:
          'msg_' + Math.random().toString(36).slice(2, 11),

        latency: Math.floor(Math.random() * 40 + 18),

        provider: 'OVWI Edge',

        plan: data.plan || 'free',

        usage,

        limit,

        remaining,

        verified: !data.upgrade,

        endpoint: '/api/verify',

        timestamp: new Date().toISOString()
      };

      setVerifyResult(visualResult);

      setActivity((prev) => [
        {
          action: data.upgrade
            ? 'Plan limit reached'
            : 'Webhook verified successfully',

          time: 'just now',

          ok: !data.upgrade
        },
        ...prev.slice(0, 4)
      ]);

      if (data.upgrade) {
        setTimeout(() => {
          window.location.href = CHECKOUT_PRO;
        }, 1400);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = async () => {
    if (!stats.apiKey) return;

    await navigator.clipboard.writeText(stats.apiKey);

    setActivity((prev) => [
      {
        action: 'API key copied',
        time: 'just now',
        ok: true
      },
      ...prev.slice(0, 4)
    ]);
  };

  const handleLogout = async () => {
    try {
      const supabase = createBrowserSupabase();
      await supabase.auth.signOut();
    } catch {}

    localStorage.removeItem('ovwi_api_key');

    window.location.href = '/';
  };

  const usagePercent =
    stats.limit > 0
      ? Math.min(
          (stats.verifications / stats.limit) * 100,
          100
        )
      : 0;

  return (
    <div className="page-shell dashboard-shell">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Dashboard
          </h1>

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

          <button
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">
            Verifications
          </div>

          <div className="stat-value stat-blue">
            {stats.verifications.toLocaleString()}
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
            API Key
          </h2>

          <p className="panel-copy">
            Use this key to verify webhook
            payloads and track API usage in
            real-time.
          </p>

          <div className="api-row">
            <input
              className="input-mono"
              type="text"
              value={stats.apiKey}
              readOnly
            />

            <button
              className="btn btn-primary"
              onClick={copyApiKey}
            >
              Copy
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
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
                {stats.verifications} /{' '}
                {stats.limit}
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
            style={{ marginTop: 20 }}
          >
            <button
              className="btn btn-primary"
              onClick={runVerification}
              disabled={loading}
            >
              {loading
                ? 'Running Verify...'
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
            Simulated production verification
            response from OVWI Edge Runtime.
          </p>

          {!verifyResult ? (
            <div
              style={{
                padding: 24,
                borderRadius: 14,
                background:
                  'rgba(255,255,255,0.03)',
                border:
                  '1px solid rgba(121,180,255,0.10)',
                color: '#93a9c9',
                lineHeight: 1.7
              }}
            >
              Press{' '}
              <strong>
                Run Verification
              </strong>{' '}
              to simulate a live webhook
              validation request.
            </div>
          ) : (
            <div
              className={`result-box ${
                verifyResult.verified
                  ? 'result-ok'
                  : 'result-error'
              }`}
            >
              <div
                className={`result-title ${
                  verifyResult.verified
                    ? 'ok'
                    : 'error'
                }`}
              >
                {verifyResult.verified
                  ? 'Verification Successful'
                  : 'Upgrade Required'}
              </div>

              <pre className="code-block">
{JSON.stringify(
  verifyResult,
  null,
  2
)}
              </pre>
            </div>
          )}
        </div>

        <div className="card panel">
          <h2 className="panel-title">
            Recent Activity
          </h2>

          <div className="activity-list">
            {activity.map((item, i) => (
              <div
                key={i}
                className="activity-item"
              >
                <div>
                  <div className="activity-main">
                    {item.action}
                  </div>

                  <div className="activity-time">
                    {item.time}
                  </div>
                </div>

                <div className="activity-ok">
                  {item.ok ? '✓' : '!'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
