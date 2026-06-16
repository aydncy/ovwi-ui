const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
/Upgrade<\/button>/g,
`Upgrade</button>

<button 
  onClick={() => window.location.href = 'https://gumroad.com/l/pro'}
  className="bg-green-600 px-4 py-2 rounded ml-2"
>
  Buy Pro
</button>

<button 
  onClick={() => window.location.href = 'https://gumroad.com/l/scale'}
  className="bg-purple-600 px-4 py-2 rounded ml-2"
>
  Buy Scale
</button>`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ multi upgrade ready");
