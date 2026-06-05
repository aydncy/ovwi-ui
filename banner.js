const fs = require('fs');

let file = fs.readFileSync('app/layout.tsx','utf8');

file = file.replace(
'<body>',
`<body>

<div style={{
  background:'#111',
  padding:'10px',
  textAlign:'center',
  borderBottom:'1px solid #333'
}}>
  Upgrade to Pro for more API usage
  <a href="/upgrade" style={{
    marginLeft:'10px',
    color:'#0af',
    fontWeight:'bold'
  }}>
    Upgrade →
  </a>
</div>`
);

fs.writeFileSync('app/layout.tsx', file);
