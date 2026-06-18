const fs = require('fs');

let file = fs.readFileSync('app/page.tsx', 'utf8');

if (!file.includes('SALES_SECTIONS')) {

file = file.replace(
'</section>',
`</section>

{/* SALES_SECTIONS */}

{/* SOCIAL PROOF */}
<section className="text-center text-gray-500 mt-10">
  Used by developers building production-ready APIs
</section>

{/* PROBLEM */}
<section className="max-w-4xl mx-auto text-center mt-24 space-y-6 px-6">
  <h2 className="text-3xl font-bold">
    Building APIs is easy. Monetizing them isn’t.
  </h2>
  <p className="text-gray-400">
    Tracking usage, enforcing limits, and charging users is complex.
    OVWI solves this instantly.
  </p>
</section>

{/* FEATURES */}
<section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-16 px-6">

  <div className="card">
    <h3 className="font-bold">Automatic Usage Tracking</h3>
    <p className="text-gray-400 mt-2">
      Every API request is tracked in real time.
    </p>
  </div>

  <div className="card">
    <h3 className="font-bold">Built-in Limits</h3>
    <p className="text-gray-400 mt-2">
      Stop overuse automatically.
    </p>
  </div>

  <div className="card">
    <h3 className="font-bold">Instant Monetization</h3>
    <p className="text-gray-400 mt-2">
      Turn API traffic into revenue.
    </p>
  </div>

</section>

{/* HOW DEMO EXPLAIN */}
<section className="max-w-4xl mx-auto text-center mt-24 space-y-6 px-6">
  <h2 className="text-3xl font-bold">
    What you just saw
  </h2>

  <p className="text-gray-400">
    Each click simulated a real API request.
    When limits are reached — access is blocked.
    Users must upgrade to continue.
  </p>
</section>

{/* FINAL CTA */}
<section className="text-center mt-24 mb-20">

  <h2 className="text-4xl font-bold mb-6">
    Start monetizing your API today
  </h2>

  <a href="/auth/login" className="bg-blue-600 px-6 py-3 rounded">
    Create Free Account
  </a>

</section>`
);

}

fs.writeFileSync('app/page.tsx', file);

console.log("🔥 LANDING UPGRADED TO SALES PAGE");
