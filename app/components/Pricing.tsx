'use client';

const plans = [
  {
    name: "Starter",
    limit: "50 / month",
    price: "€0",
    highlight: false,
    cta: () => window.location.href = "/dashboard"
  },
  {
    name: "Pro",
    limit: "1,000 / month",
    price: "€6",
    highlight: true,
    cta: () => window.location.href =
      process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
  },
  {
    name: "Enterprise",
    limit: "10,000 / month",
    price: "€18",
    highlight: false,
    cta: () => window.location.href =
      process.env.NEXT_PUBLIC_LEMON_CHECKOUT_ENTERPRISE
  },
  {
    name: "Scale",
    limit: "100,000 / month",
    price: "€49",
    highlight: false,
    cta: () => window.location.href =
      process.env.NEXT_PUBLIC_LEMON_CHECKOUT_SCALE
  }
];

export default function Pricing(){
  return (
    <section className="pricing">
      <h2 className="section-title">Simple Pricing</h2>

      <div className="pricing-grid">
        {plans.map((p,i)=>(
          <div key={i} className={`card price-card ${p.highlight ? 'price-highlight' : ''}`}>
            <div className="price-name">{p.name}</div>
            <div className="price-limit">{p.limit}</div>
            <div className="price-amount">{p.price}</div>

            <button
              className="btn-primary"
              style={{marginTop:16, width:"100%"}}
              onClick={p.cta}
            >
              {p.name === 'Starter' ? 'Start Free' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
