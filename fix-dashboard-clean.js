const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

//❌ tüm usage + limit state'leri temizle
file = file.replace(/const \[usage, setUsage\].*\n/g, '');
file = file.replace(/const \[limit, setLimit\].*\n/g, '');
file = file.replace(/const limit = .*\n/g, '');

//✅ EN ÜSTE TEK VE DOĞRU HALİ EKLE
file = file.replace(
  "export default function Dashboard() {",
`export default function Dashboard() {

  const [usage, setUsage] = useState(0);
  const limit = 50;
`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ dashboard FULL clean fix done");
