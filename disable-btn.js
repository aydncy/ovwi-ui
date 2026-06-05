const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'<button onClick={runVerify} className="verify-btn">',
`<button
  onClick={runVerify}
  className="verify-btn"
  disabled={usage >= limit}
  style={{
    opacity: usage >= limit ? 0.5 : 1,
    cursor: usage >= limit ? 'not-allowed' : 'pointer'
  }}
>`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
