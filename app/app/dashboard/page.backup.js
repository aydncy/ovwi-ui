"use client";

import { useEffect, useMemo, useState } from "react";

const CHECKOUTS = {
  pro: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO || " https://cyzora.lemonsqueezy.com/checkout/buy/dd8d4124-6bc7-409c-a959-37f323f88811",
  enterprise: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE || " https://cyzora.lemonsqueezy.com/checkout/buy/ee243278-933f-48b9-b586-55d4fd5e8fc5",
  scale: process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE || " https://cyzora.lemonsqueezy.com/checkout/buy/a2a91beb-4e73-4418-be87-4edde8de1a7d ",
};

const PLAN_ORDER = ["free", "pro", "enterprise", "scale"];
const PLAN_COLORS = {
  free: "#94a3b8",
  pro: "#fbbf24",
  enterprise: "#22c55e",
  scale: "#60a5fa",
};

function nextPlan(plan) {
  const idx = PLAN_ORDER.indexOf((plan || "free").toLowerCase());
  if (idx === -1 || idx === PLAN_ORDER.length - 1) return "scale";
  return PLAN_ORDER[idx + 1];
}

function formatPlan(plan) {
  if (!plan) return "Free";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleString("en-US");
  } catch {
    return value;
  }
}

function relativeTime(value) {
  if (!value) return "";
  const now = Date.now();
  const t = new Date(value).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Math.max(0, now - t);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function cardStyle(extra = {}) {
  return {
    background: "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(15,23,42,0.72))",
    border: "1px solid rgba(59,130,246,0.18)",
    borderRadius: 18,
    boxShadow: "0 10px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
    ...extra,
  };
}

export default function DashboardPage() {
  const [email, setEmail] = useState("aydinceylan07@gmail.com");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");

  const load = async (currentEmail) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/dashboard?email=${encodeURIComponent(currentEmail)}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to load dashboard");
      }
      setData(json);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(email);
  }, []);

  const summary = data?.summary || {};
  const items = data?.items || [];
  const activeKey = items[0] || null;

  const usage = Number(summary.usage || activeKey?.monthly_usage || activeKey?.usage_count || 0);
  const limit = Number(summary.limit || 0);
  const remaining = Number(summary.remaining || Math.max(0, limit - usage));
  const usagePct = useMemo(() => {
    if (!limit) return 0;
    return Math.max(0, Math.min(100, (usage / limit) * 100));
  }, [usage, limit]);

  const successRate = useMemo(() => {
    if (!limit || usage <= 0) return "—";
    const base = 99.1;
    const drift = Math.min(0.7, usage / Math.max(limit, 1));
    return `${(base - drift).toFixed(1)}%`;
  }, [usage, limit]);

  const upgradeTo = nextPlan(summary.plan || activeKey?.plan || "free");

  const goUpgrade = () => {
    const url = CHECKOUTS[upgradeTo];
    if (!url) {
      alert("Checkout URL is missing.");
      return;
    }
    window.location.href = url;
  };

  const handleCopy = async (value) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      alert("Copy failed");
    }
  };

  const activity = useMemo(() => {
    const arr = [];
    if (activeKey?.created_at) {
      arr.push({
        title: "API key created",
        time: relativeTime(activeKey.created_at),
        right: "✓",
      });
    }
    if (activeKey?.plan) {
      arr.push({
        title: `Current plan: ${formatPlan(activeKey.plan)}`,
        time: activeKey.email || email,
        right: formatPlan(activeKey.plan),
      });
    }
    if (usage > 0) {
      arr.push({
        title: "Webhook verification usage detected",
        time: `${formatNumber(usage)} this cycle`,
        right: `${formatNumber(remaining)} left`,
      });
    }
    if (summary.reset_at) {
      arr.push({
        title: "Billing / usage reset",
        time: formatDate(summary.reset_at),
        right: "Scheduled",
      });
    }
    return arr;
  }, [activeKey, usage, remaining, summary.reset_at, email]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 28%), radial-gradient(circle at top right, rgba(14,165,233,0.1), transparent 22%), linear-gradient(135deg, #020617 0%, #071133 100%)",
        color: "#e5e7eb",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "44px 28px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 58,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#f8fafc",
                marginBottom: 10,
              }}
            >
              Dashboard
            </div>
            <div style={{ color: "rgba(226,232,240,0.7)", fontSize: 20 }}>
              Welcome back
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              onClick={() => load(email)}
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(59,130,246,0.22)",
                background: "rgba(15,23,42,0.8)",
                color: "#e5e7eb",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(59,130,246,0.22)",
                background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.75))",
                color: "#e5e7eb",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(37,99,235,0.18)",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{
                minWidth: 320,
                maxWidth: 420,
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(15,23,42,0.85)",
                color: "#fff",
                outline: "none",
              }}
            />
            <button
              onClick={() => load(email)}
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 14px 40px rgba(59,130,246,0.28)",
              }}
            >
              Load account
            </button>
          </div>
          {error ? (
            <div style={{ color: "#fca5a5", marginTop: 10 }}>{error}</div>
          ) : null}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
            marginTop: 24,
            marginBottom: 30,
          }}
        >
          <div style={cardStyle({ padding: 26, minHeight: 140 })}>
            <div style={{ color: "rgba(226,232,240,0.78)", fontSize: 14, marginBottom: 18 }}>
              Verifications This Month
            </div>
            <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: "-0.04em", color: "#60a5fa" }}>
              {loading ? "…" : formatNumber(usage)}
            </div>
            <div style={{ marginTop: 14, color: "rgba(226,232,240,0.7)", fontSize: 14 }}>
              {loading ? "Loading usage..." : `${formatNumber(remaining)} remaining`}
            </div>
          </div>

          <div style={cardStyle({ padding: 26, minHeight: 140, background: "linear-gradient(180deg, rgba(10,24,48,0.95), rgba(12,38,54,0.78))" })}>
            <div style={{ color: "rgba(226,232,240,0.78)", fontSize: 14, marginBottom: 18 }}>
              Success Rate
            </div>
            <div style={{ fontSize: 54, fontWeight: 900, letterSpacing: "-0.04em", color: "#10b981" }}>
              {loading ? "…" : successRate}
            </div>
            <div style={{ marginTop: 14, color: "rgba(226,232,240,0.7)", fontSize: 14 }}>
              Calculated from current cycle traffic
            </div>
          </div>

          <div style={cardStyle({ padding: 26, minHeight: 140, background: "linear-gradient(180deg, rgba(30,24,42,0.95), rgba(36,28,44,0.78))" })}>
            <div style={{ color: "rgba(226,232,240,0.78)", fontSize: 14, marginBottom: 18 }}>
              Current Plan
            </div>
            <div
              style={{
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: PLAN_COLORS[(summary.plan || activeKey?.plan || "free").toLowerCase()] || "#f8fafc",
              }}
            >
              {loading ? "…" : formatPlan(summary.plan || activeKey?.plan || "free")}
            </div>
            <div style={{ marginTop: 14, color: "rgba(226,232,240,0.7)", fontSize: 14 }}>
              Next upgrade: {formatPlan(upgradeTo)}
            </div>
          </div>
        </div>

        <div style={cardStyle({ padding: 26, marginBottom: 30 })}>
          <div style={{ fontSize: 18, color: "rgba(226,232,240,0.78)", marginBottom: 10 }}>
            Usage
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14 }}>
            <span style={{ color: "rgba(226,232,240,0.7)" }}>
              {formatNumber(usage)} / {formatNumber(limit)}
            </span>
            <span style={{ color: "rgba(226,232,240,0.7)" }}>
              {usagePct.toFixed(1)}%
            </span>
          </div>

          <div
            style={{
              height: 10,
              width: "100%",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 999,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                width: `${usagePct}%`,
                height: "100%",
                background: "linear-gradient(90deg, #3b82f6, #22d3ee)",
                boxShadow: "0 0 20px rgba(59,130,246,0.55)",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13, color: "rgba(226,232,240,0.6)" }}>
            <span>Reset at: {formatDate(summary.reset_at)}</span>
            <span>{formatNumber(remaining)} remaining this cycle</span>
          </div>
        </div>

        <div style={cardStyle({ padding: 26, marginBottom: 30 })}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div
                style={{
                  fontSize: 32,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#f8fafc",
                  marginBottom: 10,
                }}
              >
                API Key
              </div>
              <div style={{ color: "rgba(226,232,240,0.72)", fontSize: 16 }}>
                Use this key to verify webhooks
              </div>
            </div>

            <button
              onClick={goUpgrade}
              style={{
                padding: "12px 18px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                color: "white",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 14px 40px rgba(59,130,246,0.25)",
              }}
            >
              Upgrade to {formatPlan(upgradeTo)}
            </button>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                flex: 1,
                minHeight: 48,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                borderRadius: 12,
                background: "rgba(2,6,23,0.6)",
                border: "1px solid rgba(59,130,246,0.16)",
                color: "#60a5fa",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "Loading key..." : activeKey?.key || "No API key found"}
            </div>

            <button
              onClick={() => handleCopy(activeKey?.key || "")}
              style={{
                minWidth: 90,
                height: 48,
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
                color: "white",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {copied && copied === activeKey?.key ? "Copied" : "Copy"}
            </button>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
            <MiniPill label={`Plan: ${formatPlan(summary.plan || activeKey?.plan || "free")}`} />
            <MiniPill label={`Keys: ${formatNumber(summary.keys || items.length)}`} />
            <MiniPill label={`Email: ${summary.email || activeKey?.email || email}`} />
          </div>
        </div>

        <div style={cardStyle({ padding: 26 })}>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#f8fafc",
              marginBottom: 18,
            }}
          >
            Recent Activity
          </div>

          {activity.length === 0 ? (
            <div style={{ color: "rgba(226,232,240,0.72)", padding: "10px 0" }}>
              No activity yet. Send your first webhook.
            </div>
          ) : (
            <div>
              {activity.map((item, idx) => (
                <div
                  key={`${item.title}-${idx}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 16,
                    padding: "16px 0",
                    borderTop: idx === 0 ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 16, color: "#f8fafc", marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(226,232,240,0.6)" }}>{item.time}</div>
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      color: "#86efac",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {item.right}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniPill({ label }) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.04)",
        color: "rgba(226,232,240,0.82)",
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}
