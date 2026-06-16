const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
/fetch\('\/api\/verify'.*?\);/s,
`const res = await fetch('/api/verify', {
  method: 'POST',
  body: JSON.stringify({ email })
});
const data = await res.json();

setUsage(data.usage);
setApiKey(data.apiKey);`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ dashboard fetch fixed");
