const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('Buy Pro')) {

file = file.replace(
"</div>\n\n    </div>\n  );",
`
  <div className="flex gap-4 mt-6">

    <button
      onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_pro'}
      className="bg-green-600 px-4 py-2 rounded"
    >
      Buy Pro (€9)
    </button>

    <button
      onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_scale'}
      className="bg-purple-600 px-4 py-2 rounded"
    >
      Buy Scale (€29)
    </button>

  </div>

    </div>
  );
`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ upgrade buttons injected");
