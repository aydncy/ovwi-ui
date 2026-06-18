const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

file = file.replace(
/\/auth\/login\s+🚀 Start Free\s+<\/Link>/g,
`<Link href="/auth/login">
  🚀 Start Free
</Link>`
);

file = file.replace(
/\/docs\s+Docs\s+<\/Link>/g,
`<Link href="/docs">
  Docs
</Link>`
);

fs.writeFileSync('app/page.tsx', file);
console.log("✅ Links fixed");
