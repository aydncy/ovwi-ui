const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
/Upgrade<\/button>/,
`Upgrade</button>

// redirect logic
onClick={() => window.location.href = '/upgrade'}`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ upgrade button active");
