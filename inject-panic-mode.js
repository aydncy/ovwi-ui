const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('PANIC MODE ACTIVE')) {

file = file.replace(
"{/* LIMIT WARNING */}",
`{/* PANIC MODE ACTIVE */}

{usage >= limit - 1 && usage < limit && (
  <div className="bg-red-700 text-white p-4 rounded mb-4 animate-pulse border-4 border-red-500">

    <p className="text-lg font-bold">
      ⚠️ LAST REQUEST REMAINING
    </p>

    <p className="text-sm mt-1">
      Your API access is about to stop
    </p>

  </div>
)}

{usage >= limit * 0.9 && usage < limit - 1 && (
  <div className="bg-yellow-500 text-black p-3 rounded mb-4">
    ⚠️ You're about to hit your limit
  </div>
)}

{/* LIMIT WARNING */}`
);

// 🔥 BUTONLARI DAHA AGRESİF YAP
file = file.replace(
"className=\"bg-green-600 px-4 py-2 rounded",
`className="bg-green-600 px-4 py-2 rounded animate-bounce hover:scale-110 transition-transform shadow-lg shadow-green-400/60`
);

file = file.replace(
"className=\"bg-purple-600 px-4 py-2 rounded",
`className="bg-purple-600 px-4 py-2 rounded animate-bounce hover:scale-110 transition-transform shadow-lg shadow-purple-400/60`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("🔥 PANIC MODE ENABLED");
