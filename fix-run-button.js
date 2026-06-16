const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
/onClick=\{fetchUsage\}/,
`onClick={async () => {
  const res = await fetch('/api/external-verify', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (data.error === 'LIMIT_REACHED') {
    alert('Limit reached — upgrade required');
    return;
  }

  setUsage(data.usage);
}}`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ run button fixed");
