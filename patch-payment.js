const fs = require('fs');

let file = fs.readFileSync('app/upgrade/page.tsx','utf8');

file = file.replace(
'Buy Pro – €6',
`Buy Pro – €6</button>

<button onClick={async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@gmail.com' })
  });
  const data = await res.json();
  window.location.href = data.url;
}} className="verify-btn">`
);

fs.writeFileSync('app/upgrade/page.tsx', file);
