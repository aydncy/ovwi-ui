'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { CHECKOUTS } from '@/lib/checkout';

export default function DashboardPage() {
  const [email, setEmail] = useState('Loading...');
  const [apiKey, setApiKey] = useState('');
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState([
    {
      title: 'OVWI initialized',
      ok: true
    }
  ]);

  useEffect(() => {

    const loadUsage = async () => {
      try {
        const res = await fetch("/api/usage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: localStorage.getItem("ovwi_email"),
            apiKey: localStorage.getItem("ovwi_api_key")
          })
        })

        const data = await res.json()

        if (data?.ok) {
          setStats((prev:any) => ({
            ...prev,
            remaining: data.remaining,
            usage: data.usage,
            limit: data.limit,
            plan: data.plan
          }))
        }
      } catch (e) {}
    }

    loadUsage();
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

        let key =
          localStorage.getItem('ovwi_api_key') || '';

        if (!key) {
          const res = await fetch('/api/create-key', {
            method: 'POST'
          });

          const json = await res.json();

          if (json.ok && json.apiKey) {
            key = json.apiKey;

            localStorage.setItem(
              'ovwi_api_key',
              key
            );
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

      const nextUsage = Number(data.usage || 0);
      const nextLimit = Number(data.limit || 50);

      setUsage(nextUsage);
      setLimit(nextLimit);

      setLogs((prev) => [
        {
          title: data.upgrade
            ? 'Monthly limit reached'
            : 'Webhook verified successfully',
          ok: !data.upgrade
        },
        ...prev
      ]);

      if (data.upgrade) {
        setTimeout(() => {
          window.location.href =
            CHECKOUTS.pro;
        }, 1000);
      }
    } catch {
      setLogs((prev) => [
        {
          title: 'Verification failed',
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
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left,#1e3a8a 0%,#020617 40%,#000 100%)',
        color: '#fff'
      }}
    >
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          background: 'rgba(2,6,23,0.75)',
          borderBottom:
            '1px solid rgba(255,255,255,0.06)'
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <a
            href="/"
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: '#60a5fa',
              textDecoration: 'none'
            }}
          >
            OVWI
          </a>

          <div
            style={{
              display: 'flex',
              gap: 14
            }}
          >
            <a href="/docs">
              <button
                style={{
                  background:
                    'rgba(255,255,255,0.06)',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  padding:
                    '10px 18px',
                  borderRadius: 12,
                  cursor: 'pointer'
                }}
              >
                Docs
              </button>
            </a>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
              style={{
                background:
                  'linear-gradient(135deg,#2563eb,#06b6d4)',
                border: 'none',
                color: '#fff',
                padding:
                  '10px 18px',
                borderRadius: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding:
            '130px 32px 60px'
        }}
      >
        <div
          style={{
            marginBottom: 42
          }}
        >
          <div
            style={{
              color: '#60a5fa',
              fontWeight: 700,
              marginBottom: 12
            }}
          >
            ENTERPRISE WEBHOOK INFRASTRUCTURE
          </div>

          <h1
            style={{
              fontSize: 72,
              lineHeight: 1,
              margin: 0,
              fontWeight: 900
            }}
          >
            Verification Dashboard
          </h1>

          <div
            style={{
              marginTop: 18,
              color: '#94a3b8',
              fontSize: 18
            }}
          >
            {email}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(280px,1fr))',
            gap: 24,
            marginBottom: 28
          }}
        >
          {[
            {
              label: 'Verifications',
              value: usage,
              color: '#60a5fa'
            },
            {
              label: 'Remaining',
              value: Math.max(
                limit - usage,
                0
              ),
              color: '#10b981'
            },
            {
              label: 'Success Rate',
              value: '99.9%',
              color: '#fbbf24'
            }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: 24,
                padding: 30,
                background:
                  'rgba(255,255,255,0.04)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                backdropFilter:
                  'blur(14px)'
              }}
            >
              <div
                style={{
                  color: '#94a3b8',
                  marginBottom: 16
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: item.color
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1.2fr 0.8fr',
            gap: 24
          }}
        >
          <div
            style={{
              borderRadius: 28,
              padding: 34,
              background:
                'rgba(255,255,255,0.04)',
              border:
                '1px solid rgba(255,255,255,0.08)',
              backdropFilter:
                'blur(16px)'
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 12
              }}
            >
              API Verification
            </div>

            <div
              style={{
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: 28
              }}
            >
              Test your webhook verification
              system with live usage tracking.
            </div>

            <div
              style={{
                marginBottom: 14,
                color: '#94a3b8',
                fontSize: 13
              }}
            >
              API KEY
            </div>

            <input
              value={apiKey}
              readOnly
              style={{
                width: '100%',
                padding:
                  '16px 18px',
                borderRadius: 16,
                background:
                  'rgba(0,0,0,0.35)',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                color: '#60a5fa',
                marginBottom: 22
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                marginBottom: 10,
                color: '#94a3b8'
              }}
            >
              <span>Usage</span>

              <span>
                {usage} / {limit}
              </span>
            </div>

            <div
              style={{
                height: 10,
                background:
                  'rgba(255,255,255,0.08)',
                borderRadius: 999,
                overflow: 'hidden',
                marginBottom: 28
              }}
            >
              <div
                style={{
                  width: `${percent}%`,
                  height: '100%',
                  background:
                    percent >= 80
                      ? 'linear-gradient(90deg,#f59e0b,#ef4444)'
                      : 'linear-gradient(90deg,#2563eb,#06b6d4)'
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: 14
              }}
            >
              <button
                onClick={runVerification}
                disabled={loading}
                style={{
                  flex: 1,
                  border: 'none',
                  borderRadius: 16,
                  padding:
                    '16px 22px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background:
                    'linear-gradient(135deg,#2563eb,#06b6d4)',
                  color: '#fff',
                  boxShadow:
                    '0 20px 60px rgba(37,99,235,0.35)'
                }}
              >
                {loading
                  ? 'Running Verification...'
                  : 'Run Verification'}
              </button>

              <a
                href={CHECKOUTS.pro}
                style={{
                  flex: 1
                }}
              >
                <button
                  style={{
                    width: '100%',
                    borderRadius: 16,
                    padding:
                      '16px 22px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background:
                      'rgba(255,255,255,0.06)',
                    border:
                      '1px solid rgba(255,255,255,0.08)',
                    color: '#fff'
                  }}
                >
                  Upgrade
                </button>
              </a>
            </div>
          </div>

          <div
            style={{
              borderRadius: 28,
              padding: 34,
              background:
                'rgba(255,255,255,0.04)',
              border:
                '1px solid rgba(255,255,255,0.08)',
              backdropFilter:
                'blur(16px)'
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 26
              }}
            >
              Live Activity
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}
            >
              {logs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    paddingBottom: 16,
                    borderBottom:
                      '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      color: '#e2e8f0'
                    }}
                  >
                    {log.title}
                  </div>

                  <div
                    style={{
                      fontWeight: 700,
                      color: log.ok
                        ? '#10b981'
                        : '#ef4444'
                    }}
                  >
                    {log.ok
                      ? 'SUCCESS'
                      : 'ERROR'}
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
