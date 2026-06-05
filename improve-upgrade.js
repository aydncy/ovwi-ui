const fs = require('fs');

let file = fs.readFileSync('app/upgrade/page.tsx','utf8');

file = file.replace(
'Upgrade Required',
'Upgrade to Pro and unlock full access'
);

file = file.replace(
'You have reached your free usage limit.',
'You reached your free limit. Upgrade now to continue using OVWI without interruptions.'
);

fs.writeFileSync('app/upgrade/page.tsx', file);
