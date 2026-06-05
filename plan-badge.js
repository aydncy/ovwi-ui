const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'<h1>Dashboard</h1>',
`<h1>
  Dashboard
  <span style={{
    marginLeft:'10px',
    padding:'4px 10px',
    background:'#222',
    borderRadius:'6px',
    fontSize:'12px'
  }}>
    {limit > 50 ? "PRO" : "FREE"}
  </span>
</h1>`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
