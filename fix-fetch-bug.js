const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

// ❌ duplicate "const res = await" temizle
file = file.replace(/const res = await const res = await/g, 'const res = await');

// ✅ güvenli fetch bloğu
file = file.replace(
/async function fetchUsage\(\) \{[\s\S]*?\}/,
`async function fetchUsage() {
  const res = await fetch('/api/verify', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  setUsage(data.usage);
  setApiKey(data.apiKey);
}`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ fetch bug fixed");
