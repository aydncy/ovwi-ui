'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-inner">

        <Link href="/">
          <span className="brand">OVWI</span>
        </Link>

        <div className="nav-links">

          <Link href="/docs">
            <button className="nav-btn">Docs</button>
          </Link>

          <Link href="/dashboard">
            <button className="nav-btn">Dashboard</button>
          </Link>

          <Link href="/auth/login">
            <button className="nav-btn primary-btn">Login</button>
          </Link>

        </div>

      </div>
    </div>
  );
}
