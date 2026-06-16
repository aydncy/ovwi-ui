const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('Limit reached — upgrade')) {

file = file.replace(
"{/* USAGE */}",
`{/* LIMIT BLOCK */}
{usage >= limit && (
  <div className="bg-red-600 text-white p-3 rounded mb-4">
    Limit reached — upgrade required
  </div>
)}

{usage > limit * 0.8 && usage < limit && (
  <div className="bg-yellow-500 text-black p-3 rounded mb-4">
    You're close to your limit
  </div>
)}

{/* USAGE */}`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ limit UX injected");
