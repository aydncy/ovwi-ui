const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'<div className="stats">',
`{usage >= limit * 0.8 && usage < limit && (
  <div style={{
    background:'#ff9f1c',
    padding:'12px',
    borderRadius:'10px',
    marginBottom:'20px'
  }}>
    ⚡ You are close to your limit. Upgrade soon.
  </div>
)}

<div className="stats">`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
