const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

if (!file.includes('TESTIMONIAL_SECTION')) {

file = file.replace(
'OVWI handles it all automatically',
`OVWI handles it all automatically

{/* TESTIMONIAL_SECTION */}
<div className="mt-16 grid md:grid-cols-3 gap-6 text-left">

  <div className="bg-slate-900 border border-slate-800 p-5 rounded">
    <p className="text-sm text-slate-300">
      “We started charging for API access in less than a day.
      OVWI replaced weeks of backend work.”
    </p>
    <p className="text-xs text-slate-500 mt-3">
      — Indie SaaS founder
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-5 rounded">
    <p className="text-sm text-slate-300">
      “The usage tracking + limits just work.
      No edge cases, no headaches.”
    </p>
    <p className="text-xs text-slate-500 mt-3">
      — API developer
    </p>
  </div>

  <div className="bg-slate-900 border border-slate-800 p-5 rounded">
    <p className="text-sm text-slate-300">
      “We plugged OVWI in front of our API and instantly had a business model.”
    </p>
    <p className="text-xs text-slate-500 mt-3">
      — Startup team
    </p>
  </div>

</div>`
);

fs.writeFileSync('app/page.tsx', file);

console.log("🔥 TESTIMONIALS ADDED");

} else {
  console.log("✅ testimonials already exist");
}
