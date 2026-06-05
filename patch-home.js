const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

file = file.replace(
'setResult(data);',
`if (!res.ok) {
  setResult({ error: "API error", data });
  return;
}
setResult(data);`
);

fs.writeFileSync('app/page.tsx', file);
