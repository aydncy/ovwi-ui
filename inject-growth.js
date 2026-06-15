const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

if (!file.includes('Growth')) {
  file = file.replace(
    "export default function Dashboard",
    "import Growth from './growth';\n\nexport default function Dashboard"
  );

  file = file.replace(
    "{/* ✅ INFO */}",
    `<Growth usage={usage} limit={limit} />\n\n{/* ✅ INFO */}`
  );
}

fs.writeFileSync('app/dashboard/page.tsx', file);
