const fs = require('fs');

let file = fs.readFileSync('app/docs/page.tsx','utf8');

file = file.replace(
'{"email":"you@co.com"}',
'`{"email":"you@co.com"}`'
);

// ayrıca pre içine de düzgün yerleştir
file = file.replace(
'POST /api/verify\n`{"email":"you@co.com"}`',
'{`POST /api/verify\n{"email":"you@co.com"}`}'
);

fs.writeFileSync('app/docs/page.tsx', file);
