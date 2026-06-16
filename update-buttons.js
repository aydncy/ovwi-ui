const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
/Upgrade<\/button>/,
`Upgrade</button>

<button 
  onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_pro'}
  className="bg-green-600 px-4 py-2 rounded ml-2"
>
  Buy Pro (€9)
</button>

<button 
  onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_scale'}
  className="bg-purple-600 px-4 py-2 rounded ml-2"
>
  Buy Scale (€29)
</button>`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ gumroad buttons updated");
