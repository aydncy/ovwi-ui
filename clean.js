const fs = require('fs');
let file = fs.readFileSync('app/page.tsx','utf8');

file = file.replace(/OVWI[\s\S]*?Logout/g, '');

fs.writeFileSync('app/page.tsx', file);
