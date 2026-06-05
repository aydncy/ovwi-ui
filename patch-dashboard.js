const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'const runVerify = async () => {',
`const runVerify = async () => {
    try {
`
);

file = file.replace(
'setUsage(data.usage);',
'setUsage(Number(data.usage) || 0);'
);

file = file.replace(
'setLimit(data.limit);',
'setLimit(Number(data.limit) || 50);'
);

file = file.replace(
'};',
`} catch(e) {
    console.error("verify failed", e);
  }
};`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
