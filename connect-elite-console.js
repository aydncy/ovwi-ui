const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

// import ekle
file = file.replace(
"import Console from './console';",
"import Console from './console';"
);

// ekleme
if (!file.includes("<Console")) {
  file = file.replace(
  '</div>\n\n      {/* ✅ INFO */}',
  `
<Console apiKey={apiKey} />

      {/* ✅ INFO */}`
  );
}

fs.writeFileSync('app/dashboard/page.tsx', file);
