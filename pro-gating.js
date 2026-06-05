const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'const runVerify = async () => {',
`const runVerify = async () => {
  if (usage >= limit) {
    window.location.href = '/upgrade';
    return;
  }
`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
