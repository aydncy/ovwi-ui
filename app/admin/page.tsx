'use client'

import { useEffect, useMemo, useState } from 'react'

type UserRow = {
  email: string
  plan?: string
  usage_count?: number
  limit?: number
  created_at?: string
}

export default function AdminPage() {
  const [rows, setRows] = useState<UserRow[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [busyEmail, setBusyEmail] = useState('')
  const [message, setMessage] = useState('')

  const load = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/users', { cache: 'no-store' })
      const data = await res.json()
      setRows(Array.isArray(data) ? data : [])
    } catch {
      setMessage('Failed to load admin data')
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      (r.email || '').toLowerCase().includes(q) ||
      (r.plan || '').toLowerCase().includes(q)
    )
  }, [rows, query])

  const act = async (email: string, action: string, value?: string) => {
    setBusyEmail(email)
    setMessage('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, action, value })
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || 'Action failed')
      } else if (data.key) {
        setMessage(`New key for ${email}: ${data.key}`)
      } else {
        setMessage(`Action completed for ${email}`)
      }

      await load()
    } catch {
      setMessage('Action failed')
    }
    setBusyEmail('')
  }

  const totalUsers = rows.length
  const paidUsers = rows.filter((r) => (r.plan || 'free') !== 'free').length
  const totalUsage = rows.reduce((sum, r) => sum + Number(r.usage_count || 0), 0)
  const limits = rows.reduce((sum, r) => sum + Number(r.limit || 0), 0)

  return (
    <main className="container">
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 40 }}>Admin Control Panel</h1>
            <div style={{ opacity: 0.7, marginTop: 8 }}>Full user access and action controls</div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={load}>Refresh</button>
            <a className="btn" href="/founder">Founder</a>
            <a className="btn" href="/investor">Investor</a>
            <a className="btn" href="/dashboard">Product</a>
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: 20 }}>
        <div className="card stat-card">
          <div>Total Users</div>
          <h2>{totalUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>Paid Users</div>
          <h2>{paidUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>Total Usage</div>
          <h2>{totalUsage}</h2>
        </div>

        <div className="card stat-card">
          <div>Total Limits</div>
          <h2>{limits}</h2>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20, padding: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            className="input"
            style={{ maxWidth: 380 }}
            placeholder="Search by email or plan"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div style={{ opacity: 0.7 }}>
            {loading ? 'Loading...' : `${filtered.length} users`}
          </div>
        </div>

        {message && (
          <div style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 10,
            background: '#020617',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            {message}
          </div>
        )}
      </div>

      <div style={{ marginTop: 20, display: 'grid', gap: 14 }}>
        {filtered.map((u) => (
          <div key={u.email} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{u.email}</div>
                  <div style={{ opacity: 0.7, marginTop: 6 }}>
                    Plan: {u.plan || 'free'} · Usage: {u.usage_count || 0} / {u.limit || 0}
                  </div>
                </div>

                <div style={{ opacity: 0.6, fontSize: 14 }}>
                  {u.created_at ? new Date(u.created_at).toLocaleString() : ''}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'upgrade', 'free')}>
                  Free
                </button>

                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'upgrade', 'pro')}>
                  Pro
                </button>

                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'upgrade', 'enterprise')}>
                  Enterprise
                </button>

                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'upgrade', 'scale')}>
                  Scale
                </button>

                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'reset_usage')}>
                  Reset Usage
                </button>

                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'create_key')}>
                  New API Key
                </button>

                <button className="btn" disabled={busyEmail === u.email} onClick={() => act(u.email, 'delete_keys')}>
                  Delete Keys
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && filtered.length === 0 && (
          <div className="card" style={{ padding: 20 }}>
            No users found
          </div>
        )}
      </div>
    </main>
  )
}
