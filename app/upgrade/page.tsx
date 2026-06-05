'use client';

export default function Upgrade() {
  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>Upgrade Required</h1>

        <p>
          You have reached your free usage limit.
          Upgrade your plan to continue using OVWI APIs.
        </p>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="verify-btn">
            Buy Pro – €6</button>

<button onClick={async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@gmail.com' })
  });
  const data = await res.json();
  window.location.href = data.url;
}} className="verify-btn">
          </button>

          <button className="verify-btn">
            Enterprise – €18
          </button>
        </div>

      </div>
    </div>
  );
}
