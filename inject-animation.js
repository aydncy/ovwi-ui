const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('animate-pulse')) {

file = file.replace(
"className=\"bg-green-600 px-4 py-2 rounded\"",
`className="bg-green-600 px-4 py-2 rounded animate-pulse hover:scale-110 transition-transform duration-200 shadow-lg shadow-green-500/50"`
);

file = file.replace(
"className=\"bg-purple-600 px-4 py-2 rounded\"",
`className="bg-purple-600 px-4 py-2 rounded animate-pulse hover:scale-110 transition-transform duration-200 shadow-lg shadow-purple-500/50"`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ upgrade animation active");
