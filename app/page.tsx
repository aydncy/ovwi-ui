'use client';

import { useState } from "react";
import Nav from "./components/Nav";
import Chart from "./components/Chart";
import ApiBox from "./components/ApiBox";
import Pricing from "./components/Pricing";

export default function Home() {
  const [email,setEmail] = useState('');

  const saveEmail = () => {
    if (email) localStorage.setItem('ovwi_email', email);
  };

  return (
    <main className="container">
      <Nav />

      <section className="hero">
        <div>
          <div className="hero-badge">Now available</div>

          <h1 className="hero-title">
            Stop debugging.
            <br />
            Start <span className="hero-highlight">verifying.</span>
          </h1>

          <p className="hero-copy">
            Verify webhooks instantly with real-time feedback and built-in upgrade flow.
          </p>

          <div className="hero-actions">
            <input
              className="input"
              placeholder="you@company.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{minWidth:260}}
            />
            <button className="btn-primary" onClick={saveEmail}>
              Continue
            </button>
          </div>

          <div className="metric-row">
            <div className="card metric-card">
              <div className="metric-value">1M+</div>
              <div className="metric-label">Verifications</div>
            </div>
            <div className="card metric-card">
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Success</div>
            </div>
            <div className="card metric-card">
              <div className="metric-value">45ms</div>
              <div className="metric-label">Latency</div>
            </div>
          </div>
        </div>

        <ApiBox />
      </section>

      <Chart />

      <Pricing />
    </main>
  );
}
