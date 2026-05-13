'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';

export default function Dashboard() {
  const [email, setEmail] = useState('Loading...');
  const [apiKey, setApiKey] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState([
    {
      text: 'OVWI dashboard initialized',
      ok: true
    }
  ]);

  useEffect(() => {
    const init = async () => {
      try {
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

          const json = await res.json();

          if (json.ok && json.apiKey) {
            key = json.apiKey;
            localStorage.setItem('ovwi_api_key', key);
          }
        }

        setApiKey(key);
      } catch {
        window.location.href = '/auth/login';
      }
    };

    init();
  }, []);

  const runVerification = async () => {
    if (!apiKey) return;

    setLoading(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey
        })
      });

      const data = await res.json();

      const newUsage = Number(data.usage || 0);
      const newLimit = Number(data.limit || 50);

      setUsage(newUsage);
      setLimit(newLimit);

      setLogs((prev) => [
        {
          text: data.upgrade
            ? 'Monthly limit reached'
            : 'Webhook verified successfully',
          ok: !data.upgrade
        },
        ...prev
      ]);

      if (data.upgrade) {
        setTimeout(() => {
          window.location.href = CHECKOUTS.pro;
        }, 1200);
      }
    } catch {
      setLogs((prev) => [
        {
          text: 'Verification failed',
          ok: false
        },
        ...prev
      ]);
    }

    setLoading(false);
  };

  const percent =
    limit > 0
      ? Math.min((usage / limit) * 100, 100)
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
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
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
              Total Verifications
            </div>

            <div className="stat-value stat-blue">
              {usage}
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-label">
              Remaining Requests
            </div>

            <div className="stat-value stat-green">
              {Math.max(limit - usage, 0)}
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-label">
              Active Plan
            </div>

            <div className="stat-value stat-yellow">
              Free
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card panel">
            <h2 className="panel-title">
              API Verification
            </h2>

            <p className="panel-copy">
              Test your webhook verification pipeline live.
            </p>

            <div className="field">
              <label className="label">
                API KEY
              </label>

              <input
                className="input-mono"
                value={apiKey}
                readOnly
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
                color: '#94a3b8',
                fontSize: 13
              }}
            >
              <span>Usage</span>

              <span>
                {usage} / {limit}
              </span>
            </div>

            <div className="progress-wrap">
              <div
                className={`progress-bar ${
                  percent >= 100
                    ? 'progress-danger'
                    : percent >= 80
                    ? 'progress-warn'
                    : 'progress-normal'
                }`}
                style={{
                  width: `${percent}%`
                }}
              />
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
                  ? 'Running...'
                  : 'Run Verification'}
              </button>

              <a href={CHECKOUTS.pro}>
                <button className="btn btn-secondary">
                  Upgrade
                </button>
              </a>
            </div>
          </div>

          <div className="card panel">
            <h2 className="panel-title">
              Live Activity
            </h2>

            <div className="activity-list">
              {logs.map((log, i) => (
                <div
                  className="activity-item"
                  key={i}
                >
                  <div className="activity-main">
                    {log.text}
                  </div>

                  <div
                    className="activity-ok"
                    style={{
                      color: log.ok
                        ? '#10b981'
                        : '#ff5d73'
                    }}
                  >
                    {log.ok ? 'OK' : 'ERR'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
