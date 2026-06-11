const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

// supabase kullanımını güvenli hale getir
file = file.replace(
"const loadData = async () => {",
`const loadData = async () => {
    if (!supabase) return;`
);

// tüm supabase kullanımlarını safe yap
file = file.replace(/await supabase/g, 'await supabase!');

// createClient riskli call yoksa garantile
file = file.replace(/supabase\./g, 'supabase!.');

fs.writeFileSync('app/dashboard/page.tsx', file);
