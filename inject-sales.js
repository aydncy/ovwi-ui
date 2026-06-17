const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('SALES MODE')) {

file = file.replace(
'<div className="max-w-4xl mx-auto py-16 space-y-10">',
`<div className="max-w-4xl mx-auto py-16 space-y-10">

{/* SALES MODE */}

{usage >= limit * 0.8 && (
  <div className="bg-red-600 text-white p-4 rounded animate-pulse">
    ⚠️ You're about to hit your API limit
  </div>
)}

{usage >= limit - 3 && (
  <div className="bg-red-800 text-white p-4 rounded border border-red-500">
    🚨 CRITICAL: Only a few requests left
  </div>
)}`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("🔥 SALES MODE ENABLED");
