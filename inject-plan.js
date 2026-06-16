const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

if (!file.includes('PLAN INFO')) {

file = file.replace(
"<p className=\"text-gray-400\">",
`<p className="text-gray-400">

<span>Plan: {limit === 50 ? 'Free' : limit === 2000 ? 'Pro' : 'Scale'}</span><br/>`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ plan injected");
