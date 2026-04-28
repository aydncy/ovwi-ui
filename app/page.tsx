const highlights = [
  {
    title: 'Fast onboarding',
    description: 'Launch investor and founder workflows in minutes with guided setup flows.',
  },
  {
    title: 'Live metrics',
    description: 'Track usage and conversion health from a single dashboard in real time.',
  },
  {
    title: 'Revenue-ready',
    description: 'Ship pricing and checkout paths that match your go-to-market strategy.',
  },
]

export default function Home() {
  return (
    <main className="landing">
      <section className="hero">
        <p className="hero-kicker">OVWI Platform</p>
        <h1 className="hero-title">Build. Scale. Monetize.</h1>
        <p className="hero-subtitle">
          A premium operating layer for founders and investors to launch faster, measure growth,
          and convert momentum into recurring revenue.
        </p>
        <div className="hero-cta-group">
          <a className="btn btn-primary" href="/onboarding">
            Get started
          </a>
          <a className="btn btn-ghost" href="/docs">
            Explore docs
          </a>
        </div>
      </section>

      <section className="highlights" aria-label="Platform highlights">
        {highlights.map((item) => (
          <article key={item.title} className="highlight-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
