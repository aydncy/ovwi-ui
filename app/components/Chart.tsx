export default function Chart() {
  return (
    <div className="chart-card card">
      <div className="chart-head">
        <div className="chart-label">Usage</div>
        <div className="chart-live">Live</div>
      </div>

      <div className="chart-wrap">
        <svg viewBox="0 0 1000 220" preserveAspectRatio="none" className="chart-svg">
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="areaFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.30)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.02)" />
            </linearGradient>
          </defs>

          <path
            d="M20 185
               C110 165, 160 140, 240 150
               C330 162, 380 178, 460 135
               C530 100, 610 120, 680 132
               C760 145, 815 92, 900 82
               C945 78, 970 84, 980 88
               L980 220 L20 220 Z"
            fill="url(#areaFill)"
          />

          <path
            d="M20 185
               C110 165, 160 140, 240 150
               C330 162, 380 178, 460 135
               C530 100, 610 120, 680 132
               C760 145, 815 92, 900 82
               C945 78, 970 84, 980 88"
            fill="none"
            stroke="url(#lineGlow)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
