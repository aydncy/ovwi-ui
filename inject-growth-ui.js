const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

// ✅ WARNING BLOCK EKLE
if (!file.includes('LIMIT WARNING')) {

file = file.replace(
"{/* USAGE */}",
`{/* LIMIT WARNING */}
{usage >= limit && (
  <div className="bg-red-600 text-white p-3 rounded">
    Limit reached — Upgrade required
  </div>
)}

{usage > limit * 0.8 && usage < limit && (
  <div className="bg-yellow-500 text-black p-3 rounded">
    You're close to your limit
  </div>
)}

{/* USAGE */}`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ growth UI injected");
