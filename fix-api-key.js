const fs = require('fs');

let file = fs.readFileSync('app/api/verify/route.ts', 'utf8');

// ❌ eski: her zaman yeni key üret
// ✅ yeni: varsa kullan, yoksa oluştur

file = file.replace(
/const apiKey = .*generate.*;/g,
`// ✅ check existing key
let apiKey = existingKey;

if (!apiKey) {
  apiKey = generateApiKey();
  // burada DB insert olmalı
}`
);

fs.writeFileSync('app/api/verify/route.ts', file);
console.log("✅ API key logic fixed");
