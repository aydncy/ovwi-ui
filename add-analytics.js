const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'</div>\n\n      <div className="panel">',
`</div>

<div className="panel">
  <h3>Analytics</h3>
  <p>Total Requests: {usage}</p>
  <p>Remaining: {limit - usage}</p>

  <div style={{marginTop:'10px'}}>
    <div style={{
      background:'#333',
      height:'10px',
      borderRadius:'6px'
    }}>
      <div style={{
        width: (usage/limit*100) + '%',
        background:'#3b82f6',
        height:'100%',
        borderRadius:'6px'
      }} />
    </div>
  </div>

</div>

<div className="panel">`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
