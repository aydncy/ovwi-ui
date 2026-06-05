const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'<div className="stats">',
`{usage >= limit && (
  <div style={{background:'#ff2d55',padding:'12px',borderRadius:'10px',marginBottom:'20px'}}>
    Limit reached. Upgrade to continue.
  </div>
)}
<div className="stats">`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
