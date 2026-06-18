const fs = require('fs');

let file = fs.readFileSync('app/page.tsx', 'utf8');

if (!file.includes('HOW_IT_WORKS_PRO')) {

file = file.replace(
'How it works',
`How it works

{/* HOW_IT_WORKS_PRO */}`
);

file = file.replace(
'1. Connect your API',
`<div className="group hover:scale-105 transition bg-white/5 p-4 rounded">
  <p className="font-bold text-blue-400">1.</p>
  <p>Connect your API</p>
</div>`
);

file = file.replace(
'2. Track usage automatically',
`<div className="group hover:scale-105 transition bg-white/5 p-4 rounded">
  <p className="font-bold text-purple-400">2.</p>
  <p>Track usage automatically</p>
</div>`
);

file = file.replace(
'3. Set limits & monetize',
`<div className="group hover:scale-105 transition bg-white/5 p-4 rounded">
  <p className="font-bold text-green-400">3.</p>
  <p>Set limits & monetize</p>
</div>`
);

}

fs.writeFileSync('app/page.tsx', file);

console.log("🔥 HOW IT WORKS UPGRADED");
