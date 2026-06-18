const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

if (!file.includes('TRUST_LAYER_SECTION')) {

file = file.replace(
'Used by developers building monetized APIs',
`Used by developers building monetized APIs

{/* TRUST_LAYER_SECTION */}
<div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale text-xs font-extrabold tracking-tight text-white">

  <span>▲ VERCEL</span>
  <span className="italic">linear</span>
  <span>supabase</span>
  <span>resend</span>

</div>

<p className="mt-4 text-[11px] text-slate-500 text-center">
Trusted by 1,200+ developers
</p>`
);

fs.writeFileSync('app/page.tsx', file);
console.log("🔥 TRUST LAYER ADDED");

} else {
  console.log("✅ TRUST layer already exists");
}
