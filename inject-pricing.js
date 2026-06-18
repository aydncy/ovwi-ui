const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

if (!file.includes('PRICING_SECTION')) {

file = file.replace(
'Start monetizing your API today',
`Start monetizing your API today

{/* PRICING_SECTION */}
<div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">

  <div className="bg-slate-900 border border-slate-800 p-6 rounded">
    <h3 className="font-bold text-lg">Free</h3>
    <p className="text-slate-400 text-sm mt-2">For testing</p>

    <p className="text-3xl font-bold mt-4">$0</p>

    <ul className="text-sm text-slate-400 mt-4 space-y-2">
      <li>• 50 requests</li>
      <li>• Basic tracking</li>
    </ul>

    <button className="mt-6 w-full bg-slate-700 py-2 rounded text-sm">
      Get Started
    </button>
  </div>

  <div className="bg-slate-900 border border-blue-500 p-6 rounded relative">
    <span className="absolute top-2 right-2 text-xs text-blue-400">
      Popular
    </span>

    <h3 className="font-bold text-lg">Pro</h3>
    <p className="text-slate-400 text-sm mt-2">Best for startups</p>

    <p className="text-3xl font-bold mt-4">$9</p>

    <ul className="text-sm text-slate-400 mt-4 space-y-2">
      <li>• 10K requests</li>
      <li>• Full tracking</li>
      <li>• Limit enforcement</li>
      <li>• Billing integration</li>
    </ul>

    <button className="mt-6 w-full bg-blue-600 py-2 rounded text-sm">
      Upgrade
    </button>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-6 rounded">
    <h3 className="font-bold text-lg">Scale</h3>
    <p className="text-slate-400 text-sm mt-2">For heavy usage</p>

    <p className="text-3xl font-bold mt-4">$29</p>

    <ul className="text-sm text-slate-400 mt-4 space-y-2">
      <li>• Unlimited requests</li>
      <li>• Priority processing</li>
      <li>• Advanced billing</li>
    </ul>

    <button className="mt-6 w-full bg-slate-700 py-2 rounded text-sm">
      Contact
    </button>
  </div>

</div>`
);

fs.writeFileSync('app/page.tsx', file);

console.log("🔥 PRICING ADDED");

} else {
  console.log("✅ pricing already exists");
}
