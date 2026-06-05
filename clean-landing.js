const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

// ClinicFlowAC section kaldır
file = file.replace(/Used in production by ClinicFlowAC[\s\S]*?<\/div>/, '');

fs.writeFileSync('app/page.tsx', file);
