const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

//❌ setLimit çağrılarını kaldır
file = file.replace(/setLimit\(.*\);\n/g, '');

//❌ limit state varsa temizle (extra güvenlik)
file = file.replace(/const \[limit, setLimit\].*\n/g, '');

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ removed setLimit usage");
